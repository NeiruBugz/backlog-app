import { Button, List, Tag, Typography } from 'antd';
import { HowLongToBeatEntry } from 'howlongtobeat';
import styles from './styles.module.scss';
import { PlatformTag } from '../platform-tag';

const SearchListItem = ({ item }: { item: HowLongToBeatEntry }): JSX.Element => {
  const { name, platforms, imageUrl, id, gameplayMain, gameplayMainExtra, gameplayCompletionist } =
    item;
  const Tags = () => {
    if (platforms.length === 0) {
      return <></>;
    }

    return (
      <>
        <Typography.Title level={5}>Playable on</Typography.Title>
        <div className={styles['ba-search-result__tags']}>
          {platforms.map((platform) => {
            return <PlatformTag platform={platform} key={`${platform}--${id}`}/>;
          })}
        </div>
      </>
    );
  };

  const Completions = () => {
    return (
      <div className={styles['ba-search-result__completions']}>
        <Typography.Title level={5}>Completion hours</Typography.Title>
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
    );
  };

  return (
    <div className={styles['ba-search-result']}>
      <img className={styles['ba-search-result__image']} src={imageUrl} alt={`${name}'s image`}/>
      <Typography.Title level={4} className={styles['ba-search-result__title']}>
        {name}
      </Typography.Title>
      <div>
        <Tags/>
      </div>
      <Completions/>
      <div>
        <Typography.Title level={5}>Actions</Typography.Title>
        <Button>Add Game</Button>
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
          return <SearchListItem item={item}/>;
        }}
      />
    ) : null}
  </>
);

export { SearchResultsList };
