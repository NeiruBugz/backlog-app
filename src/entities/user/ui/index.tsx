import { Avatar, Dropdown } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import type { UserProps } from '@shared';

import user from 'shared/assets/user.png';
import styles from './styles.module.scss';

const User = ({ username, avatarUrl, onLogout }: UserProps): JSX.Element => {
  const { t } = useTranslation();
  const isDefault = Boolean(avatarUrl);

  const onDropdownItemClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      onLogout?.();
    } else {
      console.log('menu click');
    }
  };

  return (
    <Dropdown
      trigger={['click']}
      menu={{
        items: [
          {
            type: 'group',
            label: username,
            children: [
              {
                key: 'logout',
                label: t('home.header.user.dropdown.options.logout'),
                icon: <LogoutOutlined />,
              },
            ],
          },
        ],
        onClick: onDropdownItemClick,
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
      </div>
    </Dropdown>
  );
};

export { User };
