import { render } from '@testing-library/react';
import React from 'react';
import { GameCard } from '../../src/entities/game';
import { cardProps } from '../../src/mocks';

describe('GameCard', () => {
  it('snapshots', () => {
    const { container } = render(<GameCard {...cardProps}/>);
    expect(container).toMatchSnapshot();
  });
});