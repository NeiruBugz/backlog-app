import classNames from 'classnames';
import styles from './styles.module.scss';

const Home = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles['ba-home']}>
        <input type="text" placeholder="Search" className={classNames(styles['ba-home--search'], 'ba-input')} />
      </div>
    </div>
  );
};

export default Home;