import { Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth, UserProps } from '@shared';
import user from 'shared/assets/user.png';
import styles from './styles.module.scss';

const Logout = (): JSX.Element => {
  const { logout } = useAuth();

  return <span onClick={logout}>Logout</span>;
};

const User = ({ username, avatarUrl }: UserProps): JSX.Element => {
  const isDefault = Boolean(avatarUrl);

  return (
    <Dropdown menu={{ items: [{ key: 1, label: Logout() }] }}>
      <div className={styles['ba-user']}>
        {!isDefault ? (
          <Avatar size={32} icon={<UserOutlined />} />
        ) : (
          <img
            src={avatarUrl ? avatarUrl : user}
            alt={`${username}'s avatar`}
            className={styles['ba-user-avatar']}
          />
        )}
        <p>{username}</p>
      </div>
    </Dropdown>
  );
};

export { User };
