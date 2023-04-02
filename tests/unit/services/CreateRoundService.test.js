import { createRound } from '@/services/CreateRoundService';
import { saveRound } from '@/lib/redis';

jest.mock('../../../lib/redis', () => ({
  saveRound: jest.fn()
}));

describe('CreateRoundService', () => {
  it('formats and saves a round', async () => {
    const number = 1;
    const contestantsIds = [
      'a33d6012-a9e1-46ed-8f50-1f79464a6e40',
      '10f13276-9d77-4941-8f98-ccda13ffd192',
    ];
    await createRound({ number, contestantsIds });
    expect(saveRound).toHaveBeenCalledTimes(1);
    expect(saveRound).toHaveBeenCalledWith({
      number,
      contestantsIds,
      timestamp: expect.any(String)
    });
  });
});
