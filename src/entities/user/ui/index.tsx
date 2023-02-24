import { useTranslation } from 'react-i18next';
import { Menu } from '@headlessui/react';

import type { UserProps } from '@shared';

import user from 'shared/assets/user.png';
import styles from './styles.module.scss';

const User = ({ username, avatarUrl, onLogout }: UserProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <Menu as="div">
        <Menu.Button>
          <div className={styles['ba-user']}>
            <img
              src={avatarUrl ? avatarUrl : user}
              alt={`${username}'s avatar`}
              className={styles['ba-user__avatar']}
            />
          </div>
        </Menu.Button>
        <Menu.Items as="div" style={{ position: 'absolute' }}>
          <Menu.Item as="p">{username}</Menu.Item>
          <Menu.Item as="button" onClick={onLogout}>{t('home.header.user.dropdown.options.logout')}</Menu.Item>
        </Menu.Items>
      </Menu>
    </>
  );
};

export { User };
