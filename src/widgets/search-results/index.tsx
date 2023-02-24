import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useCallback, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { changePayload } from '@entities';
import { Text, Tag } from '@widgets';

import type { HowLongToBeatEntry } from 'howlongtobeat';

import styles from './styles.module.scss';

const SearchListItem = ({ item }: { item: HowLongToBeatEntry }): JSX.Element => {
  const { name, platforms, imageUrl, id, gameplayMain, gameplayMainExtra, gameplayCompletionist } =
    item;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onAddClick = () => {
    changePayload(item);
    navigate('/add-game');
  };

  const Tags = () => {
    if (platforms.length === 0) {
      return <></>;
    }

    return (
      <div className={styles['ba-search-result__tags']}>
        <Text heading level={5}>
          {t('games-list.searchResults.playableOn')}
        </Text>
        <div className={styles['ba-search-result__tags-wrapper']}>
          {platforms.map((platform) => (
            <Tag type="platform" platform={platform} key={`${platform}--${id}`} />
          ))}
        </div>
      </div>
    );
  };

  const Completions = () => {
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
      <div className={styles['ba-search-result__completions']}>
        <Text heading level={5}>
          {t('games-list.searchResults.completion.completionHours')}
        </Text>
        <div className={styles['ba-search-result__completions-wrapper']}>
          <Tag type="common">
            {t('games-list.searchResults.completion.main')}:{' '}
            {t(`games-list.searchResults.completion.${determinePluralityKey(gameplayMain)}`, {
              count: gameplayMain,
            })}
          </Tag>
          <Tag type="common">
            {t('games-list.searchResults.completion.mainExtra')}:{' '}
            {t(`games-list.searchResults.completion.${determinePluralityKey(gameplayMainExtra)}`, {
              count: gameplayMainExtra,
            })}
          </Tag>
          <Tag type="common">
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
    <div className={styles['ba-search-result']}>
      <img className={styles['ba-search-result__image']} src={imageUrl} alt={`${name}'s image`} />
      <Text heading level={4} className={styles['ba-search-result__title']}>
        {name}
      </Text>
      <Tags />
      <Completions />
      <div>
        <Text heading level={5}>
          Actions
        </Text>
        <button onClick={onAddClick}>{t('common.addGame')}</button>
      </div>
    </div>
  );
};

const SearchResultsList = ({ results }: { results: HowLongToBeatEntry[] }) => {
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
          listStyle: 'none'
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <li data-index={virtualItem.index} key={virtualItem.key} ref={virtualizer.measureElement}>
            <SearchListItem item={results[virtualItem.index]} />
          </li>
        ))}
      </ul>
      {/* {results.length ? (
        <List itemLayout="vertical" header={<h3>Search Results</h3>}>
          <VirtualList data={results} itemKey="name" height={650}>
            {(item) => <SearchListItem item={item} />}
          </VirtualList>
        </List>
      ) : null} */}
    </div>
  );
};

export { SearchResultsList };
