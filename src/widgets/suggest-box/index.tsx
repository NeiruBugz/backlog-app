import { HowLongToBeatEntry } from 'howlongtobeat';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@shared';
import { Avatar, List } from 'antd';
import VirtualList from 'rc-virtual-list';
import styles from './styles.module.scss';

const LIST_ITEM_HEIGHT = 72;

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

  const listHeight = useMemo(() => {
    if (list.length < 5) {
      return LIST_ITEM_HEIGHT * list.length;
    }

    return LIST_ITEM_HEIGHT * 5;
  }, [list]);

  return (
    <>
      {list.length ? (
        <List
          className={styles['ba-suggestbox-list']}
          bordered
          style={{ width, left: xPos, top: yPos }}
        >
          <VirtualList
            data={list}
            itemKey={(item) => `${item.name}--${item.id}`}
            itemHeight={LIST_ITEM_HEIGHT}
            height={listHeight}
          >
            {(item) => (
              <List.Item onClick={() => onClick(item)} style={{ cursor: 'pointer' }}>
                <List.Item.Meta avatar={<Avatar src={item.imageUrl} />} title={item.name} />
              </List.Item>
            )}
          </VirtualList>
        </List>
      ) : null}
    </>
  );
};

export { SuggestBox };
