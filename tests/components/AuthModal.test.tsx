import React from 'react';
import { render } from '@testing-library/react';
import { AuthModal } from '../../src/ui/components/modal/AuthModal';

describe('AuthModal Component', () => {
  test('snapshot', () => {
    render(<AuthModal isOpen={true} />);
    expect(screen).toMatchSnapshot();
  });
});