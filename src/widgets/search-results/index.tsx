import { Button, List, Tag, Typography } from 'antd';
import type { HowLongToBeatEntry } from 'howlongtobeat';
import styles from './styles.module.scss';
import { PlatformTag } from '../platform-tag';
import { useNavigate } from 'react-router';
import VirtualList from 'rc-virtual-list';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { changePayload } from '@entities';

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
        <Typography.Title level={5}>{t('games-list.searchResults.playableOn')}</Typography.Title>
        <div className={styles['ba-search-result__tags-wrapper']}>
          {platforms.map((platform) => {
            return <PlatformTag platform={platform} key={`${platform}--${id}`} />;
          })}
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
        <Typography.Title level={5}>
          {t('games-list.searchResults.completion.completionHours')}
        </Typography.Title>
        <div className={styles['ba-search-result__completions-wrapper']}>
          <Tag className={styles['ba-search-result__completions-tag']}>
            {t('games-list.searchResults.completion.main')}:{' '}
            {t(`games-list.searchResults.completion.${determinePluralityKey(gameplayMain)}`, {
              count: gameplayMain,
            })}
          </Tag>
          <Tag className={styles['ba-search-result__completions-tag']}>
            {t('games-list.searchResults.completion.mainExtra')}:{' '}
            {t(`games-list.searchResults.completion.${determinePluralityKey(gameplayMainExtra)}`, {
              count: gameplayMainExtra,
            })}
          </Tag>
          <Tag className={styles['ba-search-result__completions-tag']}>
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
      <Typography.Title level={4} className={styles['ba-search-result__title']}>
        {name}
      </Typography.Title>
      <Tags />
      <Completions />
      <div>
        <Typography.Title level={5}>Actions</Typography.Title>
        <Button onClick={onAddClick}>{t('common.addGame')}</Button>
      </div>
    </div>
  );
};

const SearchResultsList = ({ results }: { results: HowLongToBeatEntry[] }) => (
  <>
    {results.length ? (
      <List itemLayout="vertical" header={<h3>Search Results</h3>}>
        <VirtualList data={results} itemKey="name" height={650}>
          {(item) => <SearchListItem item={item} />}
        </VirtualList>
      </List>
    ) : null}
  </>
);

export { SearchResultsList };
