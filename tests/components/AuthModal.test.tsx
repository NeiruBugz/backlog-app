import React from 'react';
import { render } from '@testing-library/react';
import { AuthModal } from '../../src/ui/components/modal/AuthModal';

describe('AuthModal Component', () => {
  it('snapshot', () => {
    const { container } = render(<AuthModal isOpen={true} />);
    expect(container).toMatchSnapshot();
  });
});