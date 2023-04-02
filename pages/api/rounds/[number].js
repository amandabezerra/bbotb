import { getRound } from '@/services/GetRoundService';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const number = req.query?.number;
    if (!number) {
      res.status(400).json({ message: 'Missing Required Information' });
      return;
    }
    try {
      const round = await getRound(parseInt(number));
      if (!round) {
        res.status(404).json({ message: 'Entity Not Found' });
        return;
      }
      res.status(200).json(round);
    } catch {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
