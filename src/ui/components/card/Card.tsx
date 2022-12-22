import { CardProps } from '@localtypings';
import './card.css';

const createPlatformClassName = (platform: string) => {
  if (platform.includes('nintendo')) {
    return 'ba-card__platform--nintendo';
  }

  if (platform.includes('playstation')) {
    return 'ba-card__platform--playstation';
  }

  if (platform.includes('xbox')) {
    return 'ba-card__platform--xbox';
  }
};

const Card = ({ title, img, platform }: CardProps): JSX.Element => {
  return (
    <div className="ba-card">
      <div className="ba-card__image" style={{ backgroundImage: `url(${img})` }} />
      <div className="ba-card__info">
        <p className="ba-card__title">{title}</p>
        <span className={`ba-card__platform ${createPlatformClassName(platform.toLowerCase())}`}>
          {platform}
        </span>
      </div>
    </div>
  );
};

export { Card };
