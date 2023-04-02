import { registerVote } from '@/services/RegisterVoteService';
import { saveVote } from '@/lib/redis';

jest.mock('../../../lib/redis', () => ({
  saveVote: jest.fn()
}));

describe('RegisterVoteService', () => {
  it('formats and saves a vote', async () => {
    const rawVote = {
      roundNumber: 1,
      contestantId: 'a33d6012-a9e1-46ed-8f50-1f79464a6e40'
    };
    await registerVote(rawVote);
    expect(saveVote).toHaveBeenCalledTimes(1);
    expect(saveVote).toHaveBeenCalledWith({
      id: expect.any(String),
      roundNumber: rawVote.roundNumber,
      contestantId: rawVote.contestantId,
      timestamp: expect.any(String)
    });
  });
});
