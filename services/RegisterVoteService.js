import { v4 as uuidv4 } from 'uuid';
import { saveVote } from '@/lib/redis';

export async function registerVote(rawVote) {
  const vote = format(rawVote);
  await save(vote);
}

function format(rawVote) {
  return {
    id: uuidv4(),
    roundNumber: rawVote.roundNumber,
    contestantId: rawVote.contestantId,
    timestamp: new Date().toISOString(),
  };
}

async function save(vote) {
  await saveVote(vote);
}
