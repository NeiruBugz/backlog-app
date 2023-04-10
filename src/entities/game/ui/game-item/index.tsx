import { useCallback } from 'react';
import { Tag, Text } from '@widgets';
import classnames from 'classnames';
import { nanoGames, savePayload } from 'entities/game/slices';
import type { HowLongToBeatEntry } from 'howlongtobeat';
import type { FC, ChangeEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { setModal } from 'widgets/modal/modal';
import { useStore } from '@nanostores/react';
import { updateGameDocument } from '@shared';

const STATUS_OPTIONS = [
  { value: 'backlog', label: 'To Backlog' },
  { value: 'in-progress', label: 'Start' },
  { value: 'completed', label: 'Complete' },
  { value: 'abandoned', label: 'Abandon' },
];

const GameItem: FC<{ item: HowLongToBeatEntry; isAdd?: boolean }> = ({ item, isAdd }) => {
  const { name, platforms, imageUrl, id, gameplayMain, gameplayMainExtra, gameplayCompletionist } =
    item;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const game = useStore(nanoGames).find((game) => game.title === name);

  const onAddClick = () => {
    savePayload({ name, imageUrl });
    setModal({ isVisible: false, id: null });
    navigate('/add-game');
  };

  const onStatusChange: ChangeEventHandler<HTMLSelectElement> = ({ currentTarget: { value } }) => {
    if (game) {
      updateGameDocument({ id: game?.id, field: { key: 'status', value } }, 'games').then(() =>
        setModal({ isVisible: false, id: null })
      );
    }
  };

  const Tags = (): JSX.Element => {
    if (platforms.length === 0) {
      return <></>;
    }

    return (
      <div>
        <Text heading level={5} className="text-xl font-bold">
          {t('games-list.searchResults.playableOn')}
        </Text>
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform) => (
            <Tag platform={platform} key={`${platform}--${id}`} />
          ))}
        </div>
      </div>
    );
  };

  const Completions = (): JSX.Element => {
    const determinePluralityKey = useCallback((count: number): string => {
      if (count === 1) {
        return 'hours_one';
      } else if (count > 4 || count === 0) {
        return 'hours_many';
      } else {
        return 'hours_few';
      }
    }, []);

    return (
      <div>
        <Text heading level={5} className="mb-1 mt-2 text-xl font-bold">
          {t('games-list.searchResults.completion.completionHours')}
        </Text>
        <div className="flex flex-wrap gap-2">
          <Tag>
            {t('games-list.searchResults.completion.main')}:{' '}
            {t(`games-list.searchResults.completion.${determinePluralityKey(gameplayMain)}`, {
              count: gameplayMain,
            })}
          </Tag>
          <Tag>
            {t('games-list.searchResults.completion.mainExtra')}:{' '}
            {t(`games-list.searchResults.completion.${determinePluralityKey(gameplayMainExtra)}`, {
              count: gameplayMainExtra,
            })}
          </Tag>
          <Tag>
            {t('games-list.searchResults.completion.completionist')}:{' '}
            {t(
              `games-list.searchResults.completion.${determinePluralityKey(gameplayCompletionist)}`,
              { count: gameplayCompletionist }
            )}
          </Tag>
        </div>
      </div>
    );
  };

  return (
    <div className={classnames('rounded-box my-4 flex bg-white p-4')}>
      <img className="rounded-box mr-4 w-64 object-contain" src={imageUrl} alt={`${name} poster`} />
      <div>
        <Text heading level={4} className="mb-1 text-2xl font-bold">
          {name}
        </Text>
        <Tags />
        <Completions />
        {isAdd ? (
          <button onClick={onAddClick} className="btn-primary btn mt-4">
            {t('common.addGame')}
          </button>
        ) : (
          <div className="mt-4">
            <label className="label-text font-semibold">
              Change status:
              <select
                className="select-bordered select ml-2"
                value={game?.status}
                onChange={onStatusChange}
              >
                {STATUS_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export { GameItem };
