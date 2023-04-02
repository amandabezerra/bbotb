import { saveRound } from '@/lib/redis';

export async function createRound({ number, contestantsIds }) {
  const round = format(number, contestantsIds);
  await save(round);
}

function format(number, contestantsIds) {
  return {
    number,
    contestantsIds,
    timestamp: new Date().toISOString(),
  };
}

async function save(round) {
  await saveRound(round);
}
