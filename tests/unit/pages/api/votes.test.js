import handler from '@/pages/api/votes';
import { getStatistics } from '@/services/ComputeVotesStatisticsService';

jest.mock('../../../../services/ComputeVotesStatisticsService');

describe('Votes handler', () => {
  const req = { method: 'GET', query: {} };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 if roundNumber is missing', async () => {
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing Required Information' });
  });

  it('returns 200 with statistics data if roundNumber is valid', async () => {
    req.query.roundNumber = '1';
    const statistics = {
      "roundNumber": 1,
      "total": 5622,
      "totalPerHour": 512,
      "totalPerContestant": {
        "84f8b5d2-0575-4f41-9a24-04a0fb1331d3": 5622
      }
    };
    getStatistics.mockResolvedValueOnce(statistics);

    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(statistics);
  });

  it('returns 500 if getStatistics throws an error', async () => {
    req.query.roundNumber = '1';
    const error = new Error('Some error message');
    getStatistics.mockRejectedValueOnce(error);

    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});
