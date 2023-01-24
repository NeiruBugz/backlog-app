import { Button, List, Tag, Typography } from 'antd';
import { HowLongToBeatEntry } from 'howlongtobeat';
import styles from './styles.module.scss';
import { PlatformTag } from '../platform-tag';
import { savePayload } from '@entities';
import { useNavigate } from 'react-router';

const SearchListItem = ({ item }: { item: HowLongToBeatEntry }): JSX.Element => {
  const { name, platforms, imageUrl, id, gameplayMain, gameplayMainExtra, gameplayCompletionist } =
    item;
  const navigate = useNavigate();

  const onAddClick = () => {
    savePayload(item);
    navigate('/add-game');
  };

  const Tags = () => {
    if (platforms.length === 0) {
      return <></>;
    }

    return (
      <div className={styles['ba-search-result__tags']}>
        <Typography.Title level={5}>Playable on</Typography.Title>
        <div className={styles['ba-search-result__tags-wrapper']}>
          {platforms.map((platform) => {
            return <PlatformTag platform={platform} key={`${platform}--${id}`} />;
          })}
        </div>
      </div>
    );
  };

  const Completions = () => {
    return (
      <div className={styles['ba-search-result__completions']}>
        <Typography.Title level={5}>Completion hours</Typography.Title>
        <div className={styles['ba-search-result__completions-wrapper']}>
          <Tag className={styles['ba-search-result__completions-tag']}>
            Main: {gameplayMain} hours
          </Tag>
          <Tag className={styles['ba-search-result__completions-tag']}>
            Main+Extra: {gameplayMainExtra} hours
          </Tag>
          <Tag className={styles['ba-search-result__completions-tag']}>
            Completionist: {gameplayCompletionist} hours
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
        <Button onClick={onAddClick}>Add Game</Button>
      </div>
    </div>
  );
};

const SearchResultsList = ({ results }: { results: HowLongToBeatEntry[] }) => (
  <>
    {results.length ? (
      <List
        itemLayout="vertical"
        dataSource={results}
        header={<h3>Search Results</h3>}
        pagination={
          results.length <= 3
            ? false
            : { pageSize: 3, defaultCurrent: 1, total: results.length - 1 }
        }
        renderItem={(item: HowLongToBeatEntry) => {
          return <SearchListItem item={item} />;
        }}
      />
    ) : null}
  </>
);

export { SearchResultsList };
