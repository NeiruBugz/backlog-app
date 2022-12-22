import { render } from '@testing-library/react';
import App from '../../src/App';

describe('App Component', () => {
  it('snapshot', () => {
    const { container } = render(<App/>);
    expect(container).toMatchSnapshot();
  });
});