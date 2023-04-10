import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { GameItem } from '@entities';

import type { FC } from 'react';
import type { HowLongToBeatEntry } from 'howlongtobeat';

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
            <GameItem item={virtualItem} isAdd />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { SearchResultsList };
