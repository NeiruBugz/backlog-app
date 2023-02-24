import { Translation } from 'react-i18next';
import { GameCard } from '@entities';
import { Divider, Text } from '@widgets';

import type { Game } from '@entities';

enum FilterKeys {
  BACKLOG = 'Backlog',
  IN_PROGRESS = 'In progress',
  COMPLETED = 'completed',
}

interface ListProps {
  listItems: Game[];
  dividerText?: string;
  listClass?: string;
  listItemClass?: string;
};

const EmptyBacklogPropmt = () => (
  <Text heading={true} level={4}>
    <Translation>{(t) => t('games-list.emptyBacklog')}</Translation>
  </Text>
);

const EmptyList = ({ text }: { text: string }) => {
  if (text === FilterKeys.BACKLOG) {
    return (
      <>
        <Divider>{text}</Divider>
        <EmptyBacklogPropmt />
      </>
    );
  } else {
    return <></>;
  }
};

const List = ({ listItems, dividerText, listClass, listItemClass }: ListProps): JSX.Element => {
  if (listItems.length === 0 && dividerText) {
    return <EmptyList text={dividerText} />;
  }

  return (
    <>
      {dividerText ? <Divider >{dividerText}</Divider> : null}
      <ul className={listClass}>
        {listItems.map((game) => (
          <li className={listItemClass} key={game.id}>
            <GameCard {...game} />
          </li>
        ))}
      </ul>
    </>
  );
};

export { List };
