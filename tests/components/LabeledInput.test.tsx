import { LabeledInput } from '@components';
import { render } from '@testing-library/react';

const props = {
  label: 'Snapshot',
  inputId: 'snapshot',
  inputType: 'text',
  inputName: 'snapshot',
};

describe('LabeledInput', () => {
  it('snapshot', () => {
    const { container } = render(<LabeledInput {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('snapshot with classes', () => {
    const { container } = render(<LabeledInput {...props} />);
    expect(container).toMatchSnapshot();
  });
});