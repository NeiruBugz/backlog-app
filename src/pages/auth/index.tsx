import { useNavigate } from 'react-router';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { firebaseAuth } from '@shared';

import type { MouseEventHandler } from 'react';
import { setUser } from 'entities/user/slice/index';
import { useTranslation } from 'react-i18next';

const Auth = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [signInWithGoogle] = useSignInWithGoogle(firebaseAuth);

  const onGoogleLogin: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    signInWithGoogle().then((res) => {
      if (res) {
        const {
          user: { displayName, photoURL, uid },
        } = res;
        if (displayName) {
          setUser({
            uid: uid,
            authorized: true,
            username: displayName,
            avatarUrl: photoURL ?? '',
          });
          navigate('/list');
        }
      }
    });
  };

  return (
    <main className="flex justify-center items-center">
      <form className="form-control w-full max-w-2xl">
        <button type="button" className="btn btn-accent my-3" onClick={onGoogleLogin}>
          {t('auth.googleSignIn')}
        </button>
      </form>
    </main>
  );
};

// export { Auth };

export default Auth;
