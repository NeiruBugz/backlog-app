import { Translation } from 'react-i18next';
import { GameCard } from '@entities';
import { Divider, Text } from '@widgets';

import type { FC, MouseEvent } from 'react';
import type { Game } from '@entities';
import { api } from '@shared';
import { setModal } from 'widgets/modal/modal';

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

  const onCardClick = (event: MouseEvent<HTMLLIElement>, title: string): void => {
    event.preventDefault();
    event.stopPropagation();

    api.search(title).then((response) => {
      if (response.length !== 0) {
        const [info] = response.filter((item) => item.name === title);
        if (info) {
          setModal({ id: 'gameInfo', isVisible: true, modalProps: info });
        }
      }
    });
  };

  return (
    <>
      {dividerText ? (
        <Divider>
          <Text heading={true} level={4} className="text-lg sm:text-xl">
            {dividerText}
          </Text>
        </Divider>
      ) : null}
      <ul className="mt-6 flex h-[90%] flex-wrap gap-6 overflow-scroll p-6">
        {listItems.map((game) => (
          <li
            className="md:h-68 md:w-68 h-56 w-56 duration-300 ease-in-out hover:rounded-box hover:z-10 hover:scale-110 sm:h-64 sm:w-64 xl:h-96 xl:w-96"
            key={game.id}
            onClick={(event) => onCardClick(event, game.title)}
          >
            <GameCard {...game} />
          </li>
        ))}
      </ul>
    </>
  );
};

export { List };
