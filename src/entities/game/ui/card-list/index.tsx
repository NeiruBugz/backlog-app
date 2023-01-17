import { Divider } from 'antd';
import { Game, GameCard } from '@entities';

type ListProps = {
  listItems: Game[];
  dividerText?: string;
  listClass?: string;
  listItemClass?: string;
};

const List = ({ listItems, dividerText, listClass, listItemClass }: ListProps): JSX.Element => {
  if (listItems.length === 0) {
    return <></>;
  }

  return (
    <>
      {dividerText ? <Divider>{dividerText}</Divider> : null}
      <ul className={listClass}>
        {listItems.map((game) => {
          return (
            <li className={listItemClass} key={game.id}>
              <GameCard {...game} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export { List };
