import { useEffect, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { api, useDebounce } from '@shared';

import type { FC } from 'react';
import type { HowLongToBeatEntry } from 'howlongtobeat';

interface SuggestBoxProps {
  query: string;
  onItemClick: (item: HowLongToBeatEntry) => void;
  width: number;
  xPos: number;
  yPos: number;
}

const SuggestBox: FC<SuggestBoxProps> = ({ query, onItemClick, width, xPos, yPos }) => {
  const [list, setList] = useState<HowLongToBeatEntry[]>([]);
  const debouncedQuery = useDebounce(query, 100);
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
    if (query.length === 0) {
      setList([]);
    }
  }, [query]);

  useEffect(() => {
    api.search(debouncedQuery).then(setList);
  }, [debouncedQuery]);

  return (
    <>
      {list.length ? (
        <div
          className="absolute left-1/3 top-3 z-0 w-80 rounded-b-lg bg-primary-content shadow-md"
          ref={parentRef}
          style={{
            height: list.length * 80 > 400 ? 400 : list.length * 80,
            overflow: 'auto',
            width,
            left: xPos,
            top: yPos,
          }}
        >
          <ul
            className="relative list-none"
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
            }}
          >
            {virtualizer.getVirtualItems().map((virtualItem, index) => (
              <li
                key={virtualItem.key}
                ref={virtualizer.measureElement}
                data-index={virtualItem.index}
                className="absolute left-0 top-0 my-2 flex cursor-pointer items-center justify-start gap-3 pl-3 hover:bg-primary-focus"
                style={{
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
                onClick={() => onItemClick(list[index])}
              >
                <img
                  className="max-h-16 w-16 object-fill"
                  src={list[index].imageUrl}
                  alt={list[index].name}
                />
                <span className="ml-4 text-sm font-bold text-primary hover:text-primary-content">
                  {list[index].name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export { SuggestBox };
