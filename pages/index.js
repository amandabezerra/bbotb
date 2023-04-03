import { useState } from 'react';
import Head from 'next/head';

import Heading from '@/components/Heading';
import Text from '@/components/Text';
import Button from '@/components/Button';
import Avatar from '@/components/Avatar';

import styles from './styles.module.css';
import contestant1 from '@/public/images/contestant1.png';
import contestant2 from '@/public/images/contestant2.png';
import contestant3 from '@/public/images/contestant3.png';

export default function Home({ roundNumber, options }) {
  const [selected, setSelected] = useState(null);
  const [voteFinished, setVoteFinished] = useState(false);

  return (
    <>
      <Head>
        <title>Big Battle of the Best</title>
        <meta name="description" content="Voting for the Big Battle of the Best" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.container}>
          <div className={styles.roundContainer}>
            <Heading level={1}>ROUND {roundNumber}</Heading>
            <div className={styles.logoContainer}>
              <Text>[BBotB]</Text>
            </div>
          </div>
          <div className={styles.messageContainer}>
            {(!selected && !voteFinished) && (
              <Text size="large">
                Escolha quem você quer <span className={styles.redColor}>eliminar</span>
              </Text>
            )}
            {(selected && !voteFinished) && (
              <Text size="large">
                Você escolheu&nbsp;
                <span className={styles.redColor}>
                  {options.find(option => option.id === selected)?.name}
                </span>
              </Text>
            )}
            {voteFinished && (
              <>
                <Text size="large">Obrigada por votar!</Text>
                <Text size="large">Confira a parcial dos votos:</Text>
              </>
            )}
          </div>
          <div className={styles.votingCardContainer}>
            <div className={styles.avatarContainer}>
              {options.map((option, index) => (
                <Avatar
                  id={option.id}
                  key={option.id}
                  name={voteFinished ? `${option.percentage}%` : option.name}
                  src={option.src}
                  selected={selected === option.id}
                  handleSelect={setSelected}
                  data-testid={`option${index + 1}`}
                />
              ))}
            </div>
          </div>
          {!voteFinished && (
            <div className={styles.buttonContainer}>
              <Button
                label="Confirme seu voto"
                disabled={!selected}
                handleClick={() => setVoteFinished(true)}
              />
            </div>
          )}
          {voteFinished && (
            <div className={styles.buttonContainer}>
              <Button
                label="Votar novamente"
                handleClick={() => setVoteFinished(false)}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const roundNumber = 2;
  const options = [
    {
      id: 1,
      name: 'Gumball',
      src: contestant1,
      selected: false,
      percentage: 10,
    },
    {
      id: 2,
      name: 'Amethyst',
      src: contestant2,
      selected: false,
      percentage: 85,
    },
    {
      id: 3,
      name: 'Marceline',
      src: contestant3,
      selected: true,
      percentage: 5,
    },
  ];

  return {
    props: {
      roundNumber,
      options,
    },
  }
}
