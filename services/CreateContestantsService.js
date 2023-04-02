import { v4 as uuidv4 } from 'uuid';
import { saveContestant } from '@/lib/redis';

export async function createContestant(contestants) {
  const list = contestants.map(contestant => format(contestant));
  list.forEach(async contestant => {
    await save(contestant);
  });
}

function format(contestant) { 
  return {
    id: uuidv4(),
    name: contestant.name,
    bio: contestant.bio,
  };
}

async function save(contestant) {
  await saveContestant(contestant);
}
