import handler from '@/pages/api/vote';
import { registerVote } from '@/services/RegisterVoteService';

jest.mock('../../../../services/RegisterVoteService');

describe('Vote handler', () => {
  const req = { method: 'POST', body: {} };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 if roundNumber is missing', async () => {
    const invalidVote = {
      contestantId: 'd59deac1-24f2-40d4-b11f-4fe951e42102',
    };
    req.body = invalidVote;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing Required Information' });
    expect(registerVote).not.toHaveBeenCalled();
  });

  it('returns 400 if contestantId is missing', async () => {
    const invalidVote = { roundNumber: 1 };
    req.body = invalidVote;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing Required Information' });
    expect(registerVote).not.toHaveBeenCalled();
  });

  it('registers vote and returns 201 if vote is valid', async () => {
    const validVote = {
      roundNumber: 1,
      contestantId: 'd59deac1-24f2-40d4-b11f-4fe951e42102',
    };
    req.body = validVote;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Created' });
    expect(registerVote).toHaveBeenCalledWith(validVote);
  });

  it('returns 500 if registerVote throws an error', async () => {
    const validVote = {
      roundNumber: 1,
      contestantId: 'd59deac1-24f2-40d4-b11f-4fe951e42102',
    };
    req.body = validVote;
    const error = new Error('Some error message');
    registerVote.mockRejectedValueOnce(error);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});
