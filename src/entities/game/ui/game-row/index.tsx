import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Row } from 'antd';
import styles from './styles.module.scss';

type GameRowProps = {
  titleHref: string;
  data: {
    completed: boolean;
    title: string;
  };
};

const GameRow = ({ data, titleHref }: GameRowProps) => {
  return (
    <Row
      className={
        cn(styles.root, { [styles.completed]: data.completed })
      }
    >
      {titleHref
        ? <Link to={titleHref}>{data.title}</Link>
        : data.title
      }
    </Row>
  );
};

export { GameRow };
