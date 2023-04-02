import { createContestant } from '@/services/CreateContestantsService';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { contestants } = req.body
    if (!contestants) {
      res.status(400).json({ message: 'Missing Required Information' });
      return;
    }
    try {
      await createContestant(contestants);
      res.status(201).json({ message: 'Created' });
    } catch {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
