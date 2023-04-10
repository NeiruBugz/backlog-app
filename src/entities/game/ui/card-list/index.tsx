import { Translation } from 'react-i18next';
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
      <ul className="mt-6 flex h-[90%] flex-wrap gap-6 overflow-scroll">
        {listItems.map((game) => (
          <li className="md:h-68 md:w-68 h-56 w-56 sm:h-64 sm:w-64 xl:h-96 xl:w-96" key={game.id}>
            <GameCard {...game} />
          </li>
        ))}
      </ul>
    </>
  );
};

export { List };
