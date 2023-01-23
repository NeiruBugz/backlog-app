import { HowLongToBeatEntry } from 'howlongtobeat';
import { useEffect, useState } from 'react';
import { api } from '@shared';
import { Avatar, List } from 'antd';
import VirtualList from 'rc-virtual-list';
import styles from './styles.module.scss';

const SuggestBox = ({
  query,
  onItemClick,
  width,
  xPos,
  yPos,
}: {
  query: string;
  onItemClick: (item: HowLongToBeatEntry) => void;
  width?: number;
  xPos?: number;
  yPos?: number;
}): JSX.Element => {
  const [list, setList] = useState<HowLongToBeatEntry[]>([]);

  useEffect(() => {
    api.search(query).then(setList);
  }, [query]);

  const onClick = (entry: HowLongToBeatEntry) => {
    if (onItemClick) {
      onItemClick(entry);
    }
  };

  return (
    <List
      className={styles['ba-suggestbox-list']}
      bordered
      style={{ width, left: xPos, top: yPos }}
    >
      <VirtualList data={list} itemKey="name" itemHeight={36} height={36 * 5}>
        {(item) => (
          <List.Item onClick={() => onClick(item)} style={{ cursor: 'pointer' }}>
            <List.Item.Meta avatar={<Avatar src={item.imageUrl} />} title={item.name} />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export { SuggestBox };
