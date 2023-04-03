import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@/pages/index';

import imgePlaceholder from 'images/contestant1.png';

describe('Home', () => {
  beforeEach(() => {
    render(<Home roundNumber={2} options={options} />);
  });

  it('displays the round number and logo', () => {
    const heading = screen.getByRole('heading', { level: 1 });
    const logo = screen.getByText('[BBotB]');

    expect(heading).toHaveTextContent('ROUND 2');
    expect(logo).toBeInTheDocument();
  });

  it('displays the voting options', async () => {
    const option1 = await screen.findByTestId('option1');
    const option2 = await screen.findByTestId('option2');
    const option3 = await screen.findByTestId('option3');
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
  });

  describe('when none of the options are selected', () => {
    it('disables the voting button', () => {
      const button = screen.getByRole('button', { name: 'Confirme seu voto' });
      expect(button).toBeDisabled();
    });
  });

  describe('when one option is selected', () => {
    let contestant1 = null;

    beforeEach(async () => {
      contestant1 = screen.getByTestId('option1');
      await fireEvent.click(contestant1);
    });

    it('highlights the selected option ', () => {
      expect(contestant1).toHaveClass('selected');
    });

    it('hides the selection message', () => { 
      const message = screen.queryByText('Escolha quem você quer eliminar');
      expect(message).not.toBeInTheDocument();
    });

    it('displays the confimation message', () => {
      const message = screen.queryByText('Você escolheu');
      expect(message).toBeInTheDocument();
    });

    it('enables the voting button', () => {
      const button = screen.getByRole('button', { name: 'Confirme seu voto' });
      expect(button).not.toBeDisabled();
    });
  });

  describe('when vote is confirmed', () => {
    beforeEach(async () => {
      const contestant1 = screen.getByTestId('option1');
      await fireEvent.click(contestant1);
      const button = screen.getByRole('button', { name: 'Confirme seu voto' });
      await fireEvent.click(button);
    });

    it('hides the confirmation message', () => {
      const message = screen.queryByText('Você escolheu');
      expect(message).not.toBeInTheDocument();
    });

    it('displays the thank you message', () => {
      const message = screen.queryByText('Obrigada por votar!');
      expect(message).toBeInTheDocument();
    });

    it('displays the vote again button', () => {
      const afterButton = screen.getByText('Votar novamente');
      expect(afterButton).toBeInTheDocument();
    });
  });
});

const options = [
  {
    id: 1,
    name: 'Gumball',
    src: imgePlaceholder,
    selected: false,
    percentage: 10,
  },
  {
    id: 2,
    name: 'Amethyst',
    src: imgePlaceholder,
    selected: false,
    percentage: 85,
  },
  {
    id: 3,
    name: 'Marceline',
    src: imgePlaceholder,
    selected: true,
    percentage: 5,
  },
];
