import { CardProps } from '../../../types/props/card';
import './card.css';

const Card = ({ title, img, platform }: CardProps): JSX.Element => {
  return (
    <div className="ba-card" style={{ backgroundImage: `url(${img})` }}>
      <p className="ba-card__title">{title}</p>
      <span className="ba-card__platform">{platform}</span>
    </div>
  );
};

export { Card };
