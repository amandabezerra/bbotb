import handler from '@/pages/api/rounds/[number]';
import { getRound } from '@/services/GetRoundService';

jest.mock('../../../../../services/GetRoundService');

describe('GetRound handler', () => {
  const req = { method: 'GET', query: {} };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 200 with a round when number is provided', async () => {
    req.query.number = '1';
    const round = {
      "roundNumber": 1,
      "timestamp": "2023-04-02T01:46:12.782Z",
      "contestants": [
        {
          "id": "330619bc-d1f0-433d-9d70-8cbb641688a6",
          "name": "John Doe",
          "bio": "A talented musician"
        },
        {
          "id": "40b8a0d6-9902-4245-9a31-5045e72dd46c",
          "name": "Jane Smith",
          "bio": "A skilled dancer"
        }
      ]
    };
    getRound.mockResolvedValueOnce(round);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(round);
    expect(getRound).toHaveBeenCalledTimes(1);
    expect(getRound).toHaveBeenCalledWith(1);
  });

  it('returns 400 when number is missing', async () => {
    req.query.number = null;
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing Required Information' });
    expect(getRound).not.toHaveBeenCalled();
  });

  it('returns 404 when round is not found', async () => {
    req.query.number = '1';
    getRound.mockResolvedValueOnce(null);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Entity Not Found' });
    expect(getRound).toHaveBeenCalledTimes(1);
    expect(getRound).toHaveBeenCalledWith(1);
  });

  it('returns 500 when an error occurs', async () => {
    req.query.number = '1';
    const error = new Error('Some error message');
    getRound.mockRejectedValueOnce(error);;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    expect(getRound).toHaveBeenCalledTimes(1);
    expect(getRound).toHaveBeenCalledWith(1);
  });
});
