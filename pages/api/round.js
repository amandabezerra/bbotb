import { createRound } from '@/services/CreateRoundService';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { number, contestantsIds } = req.body
    if (!number || !contestantsIds) {
      res.status(400).json({ message: 'Missing Required Information' });
      return;
    }
    try {
      await createRound({ number, contestantsIds });
      res.status(201).json({ message: 'Created' });
    } catch {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
