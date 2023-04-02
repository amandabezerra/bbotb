import { createContestant } from '@/services/CreateContestantsService';
import { saveContestant } from '@/lib/redis';

jest.mock('../../../lib/redis', () => ({
  saveContestant: jest.fn()
}));

describe('CreateContestantsService', () => {
  it('formats and saves each contestant', async () => {
    const contestants = [
      { name: 'John Doe', bio: 'A talented musician' },
      { name: 'Jane Smith', bio: 'A skilled dancer' }
    ];
    await createContestant(contestants);
    expect(saveContestant).toHaveBeenCalledTimes(2);
    expect(saveContestant).toHaveBeenCalledWith({
      id: expect.any(String),
      name: 'John Doe',
      bio: 'A talented musician'
    });
    expect(saveContestant).toHaveBeenCalledWith({
      id: expect.any(String),
      name: 'Jane Smith',
      bio: 'A skilled dancer'
    });
  });
});
