import { getStatistics } from '@/services/ComputeVotesStatisticsService';
import { readRoundByNumber, readVotesByRoundNumber } from '@/lib/redis';

jest.mock('../../../lib/redis');

describe('ComputeVotesStatisticsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns statistics for a round with votes', async () => {
    const roundNumber = 1;
    const now = new Date();
    const roundCreated = new Date(now.getTime() - (3 * 60 * 60 * 1000)); // 3 hours ago
    const votesList = [
      { contestantId: 'a33d6012-a9e1-46ed-8f50-1f79464a6e40' },
      { contestantId: '10f13276-9d77-4941-8f98-ccda13ffd192' },
      { contestantId: 'a33d6012-a9e1-46ed-8f50-1f79464a6e40' },
    ];
    const round = { timestamp: roundCreated.toISOString() };

    readVotesByRoundNumber.mockResolvedValueOnce(votesList);
    readRoundByNumber.mockResolvedValueOnce(round);

    const result = await getStatistics(roundNumber);

    expect(result).toEqual({
      roundNumber: 1,
      total: 3,
      totalPerHour: 1,
      totalPerContestant: {
        'a33d6012-a9e1-46ed-8f50-1f79464a6e40': 2,
        '10f13276-9d77-4941-8f98-ccda13ffd192': 1
      },
    });
    expect(readVotesByRoundNumber).toHaveBeenCalledWith(roundNumber);
    expect(readRoundByNumber).toHaveBeenCalledWith(roundNumber);
  });

  it('returns statistics for a round without votes', async () => {
    const roundNumber = 2;
    const roundCreated = new Date();

    readVotesByRoundNumber.mockResolvedValueOnce([]);
    readRoundByNumber.mockResolvedValueOnce({ timestamp: roundCreated.toISOString() });

    const result = await getStatistics(roundNumber);

    expect(result).toEqual({
      roundNumber: 2,
      total: 0,
      totalPerHour: 0,
      totalPerContestant: {},
    });
    expect(readVotesByRoundNumber).toHaveBeenCalledWith(roundNumber);
    expect(readRoundByNumber).toHaveBeenCalledWith(roundNumber);
  });
});
