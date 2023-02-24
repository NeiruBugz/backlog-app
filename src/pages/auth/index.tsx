import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

import { login } from '@entities';
import { useAppDispatch } from '@shared';

import type { SubmitHandler } from 'react-hook-form';

import styles from './styles.module.scss';

interface AuthInputs {
  username: string;
  password: string;
}

const Auth = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<AuthInputs>();
  const { t } = useTranslation();

  const onAuthClick: SubmitHandler<AuthInputs> = ({ username, password }) => {
    dispatch(login({ authorized: true, username: username }));
    navigate('/list');
  };

  return (
    <main className={styles['ba-auth']}>
      <form onSubmit={handleSubmit(onAuthClick)} className={styles['ba-auth__form']}>
        <label htmlFor="login" className={styles['ba-auth__label']}>
          {t('auth.label')}
        </label>
        <input
          type="text"
          id="login"
          placeholder={t('auth.label') || ''}
          className={styles['ba-auth__input--username']}
          {...register('username', { required: true })}
        />
        <label htmlFor="password" className={styles['ba-auth__label']}>
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className={styles['ba-auth__input--password']}
          {...register('password', { required: true })}
        />
        <button type="submit" className={styles['ba-auth__button--login']}>
          {t('auth.submit')}
        </button>
        <button type="button" className={styles['ba-auth__button--signup']}>
          Sign Up
        </button>
      </form>
    </main>
  );
};

export { Auth };
