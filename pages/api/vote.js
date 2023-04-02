import { registerVote } from '@/services/RegisterVoteService';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { roundNumber, contestantId } = req.body
    if (!roundNumber || !contestantId) {
      res.status(400).json({ message: 'Missing Required Information' });
      return;
    }
    try {
      await registerVote({ roundNumber, contestantId });
      res.status(201).json({ message: 'Created' });
    } catch {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
