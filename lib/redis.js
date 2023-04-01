import { Schema, Entity, Client } from 'redis-om';

const client = new Client();

async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }
}

class Vote extends Entity {}
const voteSchema = new Schema(Vote, {
  id: { type: 'string' },
  roundNumber: { type: 'number' },
  contestantId: { type: 'string' },
  timestamp: { type: 'string' },
}, {
  dataStructure: 'JSON',
});

class Round extends Entity {}
const roundSchema = new Schema(Round, {
  number: { type: 'number' },
  contestantsIds: { type: 'string[]' },
  timestamp: { type: 'string' },
}, {
  dataStructure: 'JSON',
});

class Contestant extends Entity {}
const contestantSchema = new Schema(Contestant, {
  id: { type: 'string' },
  name: { type: 'string' },
  bio: { type: 'string' },
}, {
  dataStructure: 'JSON',
});

export async function saveVote(vote) {
  await connect();
  const repository = client.fetchRepository(voteSchema);
  const voteEntity = repository.createEntity(vote);
  const result = await repository.save(voteEntity);
  if (!result) {
    throw new Error('Error trying to save entity');
  }
}

export async function readVotesByRoundNumber(roundNumber) {
  await connect();
  const repository = client.fetchRepository(voteSchema);
  await repository.createIndex(); // will only rebuild index if the schema has changed
  const votes = await repository
    .search()
    .where('roundNumber')
    .eq(roundNumber)
    .return
    .all();
  return votes;
}

export async function saveRound({ number, timestamp, contestantsIds }) {
  await connect();
  const repository = client.fetchRepository(roundSchema);
  const roundEntity = repository.createEntity({
    number,
    timestamp,
    contestantsIds,
  });
  const result = await repository.save(roundEntity);
  if (!result) {
    throw new Error('Error trying to save entity');
  }
}

export async function readRoundByNumber(roundNumber) {
  await connect();
  const repository = client.fetchRepository(roundSchema);
  await repository.createIndex();
  const round = await repository
    .search()
    .where('number')
    .eq(roundNumber)
    .return
    .first();
  return round;
}

export async function readRoundByNumberWithParticipants(roundNumber) {
  await connect();

  const roundRepository = client.fetchRepository(roundSchema);
  await roundRepository.createIndex();
  const round = await roundRepository
    .search()
    .where('number')
    .eq(roundNumber)
    .return
    .first();

  if (!round) {
    return null;
  }

  const contestantRepository = client.fetchRepository(contestantSchema);
  await contestantRepository.createIndex();
  const allContestants = await contestantRepository.search().returnAll();
  const roundContestants = allContestants.filter(
    contestant => round.contestantsIds.includes(contestant.id)
  );

  return {
    round,
    contestants: roundContestants,
  }
}

export async function saveContestant({ id, name, bio }) {
  await connect();
  const repository = client.fetchRepository(contestantSchema);
  const contestantEntity = repository.createEntity({
    id,
    name,
    bio,
  });
  const result = await repository.save(contestantEntity);
  if (!result) {
    throw new Error('Error trying to save entity');
  }
}
