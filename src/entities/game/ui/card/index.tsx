import { Tag } from '@widgets';

import type { FC } from 'react';
import type { Game as GameProps } from '@entities';

const GameCard: FC<GameProps> = ({ title, platform, img }) => (
  <>
    <div className="md:h-68 md:w-68 card image-full h-56 w-56 cursor-pointer sm:h-64 sm:w-64 xl:h-96 xl:w-96">
      <figure>
        <img
          loading="lazy"
          src={img ? img : 'https://placehold.jp/1000x1000.png'}
          className="w-96 object-fill"
        />
      </figure>
      <div className="card-body">
        <div className="h-/14 max-h-1/3 absolute bottom-0 left-0 w-full rounded-bl-[1rem] rounded-br-[1rem] bg-gradient-to-r from-[#2d2d2d] to-transparent py-2 pl-2 pr-2 md:py-4 md:pl-4">
          <h2 className="mb-2 truncate text-[1.2em] font-bold text-primary-content">{title}</h2>
          <Tag platform={platform} />
        </div>
      </div>
    </div>
  </>
);

export { GameCard };
