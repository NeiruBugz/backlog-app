import { Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { UserProps } from '@shared';
import user from 'shared/assets/user.png';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

const User = ({ username, avatarUrl, onLogout }: UserProps): JSX.Element => {
  const { t } = useTranslation();
  const isDefault = Boolean(avatarUrl);

  return (
    <Dropdown
      menu={{
        items: [{ key: 1, label: t('home.header.user.dropdown.options.logout') }],
        onClick: onLogout,
      }}
    >
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
