import handler from '@/pages/api/round';
import { createRound } from '@/services/CreateRoundService';

jest.mock('../../../../services/CreateRoundService');

describe('Round handler', () => {
  const req = {
    method: 'POST',
    body: {
      number: 1,
      contestantsIds: [
        'a33d6012-a9e1-46ed-8f50-1f79464a6e40',
        '10f13276-9d77-4941-8f98-ccda13ffd192',
        '66e0c7fe-9835-4d0c-82be-2174916af695',
      ]
    }
  };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 if number is missing', async () => {
    const { number, ...invalidBody } = req.body;

    await handler({ ...req, body: invalidBody }, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing Required Information' });
  });

  it('returns 400 if contestantsIds is missing', async () => {
    const { contestantsIds, ...invalidBody } = req.body;

    await handler({ ...req, body: invalidBody }, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing Required Information' });
  });

  it('creates round and returns 201 if everything is valid', async () => {
    createRound.mockResolvedValueOnce();
    
    await handler(req, res);

    expect(createRound).toHaveBeenCalledWith({
      number: 1,
      contestantsIds: [
        'a33d6012-a9e1-46ed-8f50-1f79464a6e40',
        '10f13276-9d77-4941-8f98-ccda13ffd192',
        '66e0c7fe-9835-4d0c-82be-2174916af695',
      ],
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Created' });
  });

  it('returns status 500 if createRound throws an error', async () => {
    const error = new Error('Some error message');
    createRound.mockRejectedValueOnce(error);

    await handler(req, res);

    expect(createRound).toHaveBeenCalledWith({
      number: 1,
      contestantsIds: [
        'a33d6012-a9e1-46ed-8f50-1f79464a6e40',
        '10f13276-9d77-4941-8f98-ccda13ffd192',
        '66e0c7fe-9835-4d0c-82be-2174916af695',
      ],
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});
