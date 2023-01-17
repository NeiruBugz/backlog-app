import { GameCard } from '../src/entities';
import { render } from '@testing-library/react';
import { cardProps } from '../src/mocks';

describe('GameCard', () => {
  it('snapshots', () => {
    const { container } = render(<GameCard {...cardProps}/>);
    expect(container).toMatchSnapshot();
  });
});