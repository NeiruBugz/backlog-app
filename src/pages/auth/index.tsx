import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

import { login } from '@entities';
import { useAppDispatch } from '@shared';

import type { SubmitHandler } from 'react-hook-form';

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
    <main className="flex justify-center items-center">
      <form onSubmit={handleSubmit(onAuthClick)} className="form-control w-full max-w-2xl">
        <label htmlFor="login" className="label">
          {t('auth.label')}
        </label>
        <input
          type="text"
          id="login"
          placeholder={t('auth.label') || ''}
          className="input input-bordered input-primary"
          {...register('username', { required: true })}
        />
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="input input-bordered input-primary"
          {...register('password', { required: true })}
        />
        <div className="btn-group btn-group-vertical mt-3">
          <button type="submit" className="btn btn-primary">
            {t('auth.submit')}
          </button>
          <button type="button" className="btn btn-secondary">
            Sign Up
          </button>
        </div>
      </form>
    </main>
  );
};

export { Auth };
