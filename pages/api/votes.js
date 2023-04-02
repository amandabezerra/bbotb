import { searchCars } from '@/lib/redis';
import { getStatistics } from '@/services/ComputeVotesStatisticsService';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    if (!req.query.roundNumber) {
      res.status(400).json({ message: 'Missing Required Information' });
      return;
    }
    try {
      const roundNumber = parseInt(req.query.roundNumber);
      const statistics = await getStatistics(roundNumber);
      res.status(200).json(statistics);
    } catch {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
