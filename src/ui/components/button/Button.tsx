import { ButtonProps } from '@localtypings';

const Button = ({
  mode,
  text,
  onClick,
}: ButtonProps) => {
  const buttonMode = mode === 'primary' ? 'ba-button--primary' : 'ba-button--secondary';

  return (
    <button className={`ba-button ${buttonMode}`} onClick={onClick}>
      {text}
    </button>
  );
};

export { Button };
