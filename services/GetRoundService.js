import { readRoundByNumberWithParticipants } from '@/lib/redis';

export async function getRound(roundNumber) {
  const rawRound = await readRoundByNumberWithParticipants(roundNumber);
  const round = format(rawRound);
  return round;
}

function format(rawRound) {
  const roundNumber = rawRound.round.number;
  const timestamp = rawRound.round.timestamp;
  const contestants = rawRound.contestants.map(
    ({ id, name, bio }) => ({ id, name, bio })
  );

  return {
    roundNumber,
    timestamp,
    contestants,
  };
}
