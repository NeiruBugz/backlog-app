import { useRef } from 'react';
import { Translation } from 'react-i18next';
import { useVirtualizer } from '@tanstack/react-virtual';
import { GameCard } from '@entities';
import { Divider, Text } from '@widgets';

import type { FC } from 'react';
import type { Game } from '@entities';

enum FilterKeys {
  BACKLOG = 'Backlog',
  IN_PROGRESS = 'In progress',
  COMPLETED = 'completed',
}

interface ListProps {
  listItems: Game[];
  dividerText?: string;
}

const EmptyBacklogPrompt = (): JSX.Element => (
  <Text heading={true} level={4} className="text-lg sm:text-xl">
    <Translation>{(t) => t('games-list.emptyBacklog')}</Translation>
  </Text>
);

const EmptyList: FC<{ text: string }> = ({ text }) => {
  if (text === FilterKeys.BACKLOG) {
    return (
      <>
        <Divider>
          <Text heading={true} level={4} className="text-lg sm:text-xl">
            {text}
          </Text>
        </Divider>
        <EmptyBacklogPrompt />
      </>
    );
  } else {
    return <></>;
  }
};

const List: FC<ListProps> = ({ listItems, dividerText }) => {
  const parentRef = useRef<HTMLUListElement>(null);
  const virtualizer = useVirtualizer({
    count: listItems.length,
    getScrollElement: () => parentRef?.current,
    estimateSize: () => 300,
  });
  if (listItems.length === 0 && dividerText) {
    return <EmptyList text={dividerText} />;
  }

  return (
    <>
      {dividerText ? (
        <Divider>
          <Text heading={true} level={4} className="text-lg sm:text-xl">
            {dividerText}
          </Text>
        </Divider>
      ) : null}
      <ul
        ref={parentRef}
        className="mt-6 flex flex-wrap gap-2"
        style={{ height: '100%', width: '100%' }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          console.log(virtualItem);
          return (
            <li
              key={virtualItem.key}
              ref={virtualizer.measureElement}
              data-index={virtualItem.index}
            >
              <GameCard {...listItems[virtualItem.index]} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export { List };
