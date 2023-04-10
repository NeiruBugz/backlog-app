import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useCallback, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { savePayload } from '@entities';
import { Text, Tag } from '@widgets';

import type { FC } from 'react';
import type { HowLongToBeatEntry } from 'howlongtobeat';

import classnames from 'classnames';
import { setModal } from 'widgets/modal/modal';

const SearchListItem: FC<{ item: HowLongToBeatEntry }> = ({ item }) => {
  const { name, platforms, imageUrl, id, gameplayMain, gameplayMainExtra, gameplayCompletionist } =
    item;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onAddClick = () => {
    savePayload({ name, imageUrl });
    setModal({ isVisible: false, id: null });
    navigate('/add-game');
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
        <Text heading level={5} className="text-xl font-bold mb-1 mt-2">
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
    <div className={classnames('rounded-box bg-white my-4 p-4 flex')}>
      <img className="w-64 rounded-box object-contain mr-4" src={imageUrl} alt={`${name} poster`}/>
      <div>
        <Text heading level={4} className="font-bold text-2xl mb-1">
          {name}
        </Text>
        <Tags />
        <Completions />
        <button onClick={onAddClick} className="btn btn-primary mt-4">
          {t('common.addGame')}
        </button>
      </div>
    </div>
  );
};

const SearchResultsList: FC<{ results: HowLongToBeatEntry[] }> = ({ results }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: results.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 140,
  });

  return (
    <div ref={parentRef} style={{ height: '100%', overflow: 'auto' }}>
      <ul
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
          listStyle: 'none',
        }}
      >
        {results.map((virtualItem, index) => (
          <li data-index={index} key={virtualItem.id} ref={virtualizer.measureElement}>
            <SearchListItem item={virtualItem} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { SearchResultsList };
