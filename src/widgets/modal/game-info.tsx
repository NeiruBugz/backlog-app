import type { HowLongToBeatEntry } from 'howlongtobeat';
import { forwardRef, useState } from 'react';
import { GameItem, nanoGames } from '@entities';
import { Divider } from 'widgets/divider';

import type { ChangeEventHandler, MouseEventHandler } from 'react';
import { updateGameDocument } from '@shared';
import { useStore } from '@nanostores/react';

const GameInfo = forwardRef<HTMLDivElement, HowLongToBeatEntry>((props, ref) => {
  const game = useStore(nanoGames).find((game) => game.title === props.name);
  const [review, setReview] = useState('');
  const [isEditMode, setEditMode] = useState(false);

  const onReviewChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    currentTarget: { value },
  }) => {
    setReview(value);
  };

  const onReviewSubmit: MouseEventHandler<HTMLButtonElement> = () => {
    if (game) {
      updateGameDocument({ id: game.id, field: { key: 'review', value: review } }, 'games').then(
        () => setEditMode(false)
      );
    }
  };

  const enableEditMode: MouseEventHandler<HTMLButtonElement> = () => {
    if (game && game.review) {
      setReview(game?.review);
      setEditMode(true);
    }
  };

  const disableEditMode: MouseEventHandler<HTMLButtonElement> = () => setEditMode(false);

  return (
    <div className="h-10/12 max-w-10/12 rounded-box min-w-fit bg-white p-4" ref={ref}>
      <GameItem item={props} />
      {game?.review && !isEditMode ? (
        <>
          <Divider>Review</Divider>
          <p className="prose p-4">{game?.review}</p>
          <button className="btn-ghost btn" onClick={enableEditMode}>
            Edit
          </button>
        </>
      ) : (
        <>
          <Divider>Write a Review</Divider>
          <textarea
            value={review}
            onChange={onReviewChange}
            className="textarea-bordered textarea w-full text-[1.2rem]"
          />
          <button className="btn-primary btn" onClick={onReviewSubmit}>
            Submit
          </button>
          {isEditMode ? (
            <button className="btn-warning btn ml-2" onClick={disableEditMode}>
              Cancel
            </button>
          ) : null}
        </>
      )}
    </div>
  );
});

GameInfo.displayName = 'GameInfo';

export { GameInfo };
