import handler from '@/pages/api/contestants';
import { createContestant } from '@/services/CreateContestantsService';

jest.mock('../../../../services/CreateContestantsService');

describe('Contestants handler', () => {
  const req = {
    method: 'POST',
    body: {
      contestants: [
        { name: 'Alice', bio: 'Alice is cool.' },
        { name: 'Bob', bio: 'Bob is cool.' },
      ],
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 if contestants are missing', async () => {
    await handler({ ...req, body: {} }, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing Required Information' });
  });

  it('creates contestants and returns 201 if everything is valid', async () => {
    await handler(req, res);

    expect(createContestant).toHaveBeenCalledWith(req.body.contestants);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Created' });
  });

  it('returns 500 if createContestant throws an error', async () => {
    const error = new Error('Some error message');
    createContestant.mockRejectedValue(error);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});
