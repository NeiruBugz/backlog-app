import { HTMLInputTypeAttribute } from 'react';
import cn from 'classnames';

type LabeledInputProps = {
  label: string;
  inputType: HTMLInputTypeAttribute;
  inputName: string;
  inputId: string;
  labelClass?: string;
  inputClass?: string;
};

const LabeledInput = ({
  label,
  labelClass = '',
  inputId,
  inputName,
  inputType,
  inputClass = ''
} : LabeledInputProps): JSX.Element => {
  return (
    <label
      htmlFor={inputId}
      className={cn('ba-label', labelClass)}
    >
      {label}
      <input
        type={inputType}
        name={inputName}
        id={inputId}
        className={cn('ba-input', inputClass)}
      />
    </label>
  );
};

export { LabeledInput };