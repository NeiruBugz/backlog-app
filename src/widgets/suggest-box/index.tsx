import { useEffect, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { api } from '@shared';

import type { FC } from 'react';
import type { HowLongToBeatEntry } from 'howlongtobeat';

import styles from './styles.module.scss';

interface SuggestBoxProps {
  query: string;
  onItemClick: (item: HowLongToBeatEntry) => void;
  width: number;
  xPos: number;
  yPos: number;
}

const SuggestBox: FC<SuggestBoxProps> = ({ query, onItemClick, width, xPos, yPos }) => {
  const [list, setList] = useState<HowLongToBeatEntry[]>([]);
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: list.length,
    getScrollElement: () => parentRef?.current,
    estimateSize: () => 72,
  });

  useEffect(() => {
    parentRef.current?.focus();
  }, []);

  useEffect(() => {
    api.search(query).then(setList);
  }, [query]);

  return (
    <>
      {list.length ? (
        <div
          className={styles['ba-suggestbox-list']}
          ref={parentRef}
          style={{ height: 400, overflow: 'auto', width, left: xPos, top: yPos }}
        >
          <ul
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualizer.getVirtualItems().map((virtualItem, index) => (
              <li
                key={virtualItem.key}
                ref={virtualizer.measureElement}
                data-index={virtualItem.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
                onClick={() => onItemClick(list[index])}
              >
                <img src={list[index].imageUrl} alt={list[index].name} />
                <span>{list[index].name}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export { SuggestBox };
