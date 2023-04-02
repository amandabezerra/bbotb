import { getRound } from '@/services/GetRoundService';
import { readRoundByNumberWithParticipants } from '@/lib/redis';

jest.mock('../../../lib/redis', () => ({
  readRoundByNumberWithParticipants: jest.fn(),
}));

describe('GetRoundService', () => {
  it('formats and returns a round', async () => {
    const mockRound = {
      round: {
        number: 1,
        timestamp: '2022-03-30T20:00:00.000Z',
      },
      contestants: [
        {
          id: '1',
          name: 'Contestant 1',
          bio: 'Bio for Contestant 1',
        },
        {
          id: '2',
          name: 'Contestant 2',
          bio: 'Bio for Contestant 2',
        },
      ],
    };
    readRoundByNumberWithParticipants.mockResolvedValue(mockRound);

    const expectedRound = {
      roundNumber: mockRound.round.number,
      timestamp: mockRound.round.timestamp,
      contestants: mockRound.contestants.map((contestant) => ({
        id: contestant.id,
        name: contestant.name,
        bio: contestant.bio,
      })),
    };

    const round = await getRound(mockRound.round.number);

    expect(round).toEqual(expectedRound);
  });
});
