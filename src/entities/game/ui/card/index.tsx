import { Tag } from '@widgets';

import type { FC } from 'react';
import type { Game as GameProps } from '@entities';

const GameCard: FC<GameProps> = ({ title, platform, img }) => (
  <>
    <div className="card bg-base-100 shadow-xl image-full rounded-lg w-56 h-56 sm:w-64 sm:h-64 md:w-96 md:h-96">
      <figure>
        <img
          src={img ? img : 'https://placehold.jp/1000x1000.png'}
          className="w-96 object-fill rounded-lg"
        />
      </figure>
      <div className="card-body flex flex-col">
        <h2 className="card-title">{title}</h2>
        <Tag platform={platform} />
      </div>
    </div>
  </>
);

export { GameCard };
