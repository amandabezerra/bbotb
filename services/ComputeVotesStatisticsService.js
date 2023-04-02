import { readRoundByNumber, readVotesByRoundNumber } from '@/lib/redis';

export async function getStatistics(roundNumber) {
  const votesList = await readVotesByRoundNumber(roundNumber);
  const total = votesList.length;
  const totalPerHour = await getTotalPerHour(total, roundNumber);
  const totalPerContestant = getVotesPerContestant(votesList);

  return {
    roundNumber,
    total,
    totalPerHour,
    totalPerContestant,
  };
}

async function getTotalPerHour(total, roundNumber) {
  const round = await readRoundByNumber(roundNumber);
  const roundCreated = new Date(round.timestamp);
  const now = new Date();
  const hours = calculateHourDifference(roundCreated, now);
  const totalPerHour = Math.ceil(total / (hours || 1));
  return totalPerHour;
}

function calculateHourDifference(dateString1, dateString2) {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);
  const diffInMs = Math.abs(date2 - date1); // calculate the difference in milliseconds
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60)); // convert milliseconds to hours
  return diffInHours;
}

function getVotesPerContestant(votesList) {
  const totalPerContestant = votesList.reduce((acc, curr) => {
    acc[curr.contestantId] = 
      (acc[curr.contestantId] || 0) + 1;
    return acc;
  }, {});
  return totalPerContestant;
}
