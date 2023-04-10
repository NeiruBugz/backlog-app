import { useEffect } from 'react';
import { useSignInWithGoogle, useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { setUser } from '@entities';
import { firebaseAuth } from '@shared';

import type { MouseEventHandler } from 'react';

const Landing = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [signInWithGoogle] = useSignInWithGoogle(firebaseAuth);
  const [user, loading] = useAuthState(firebaseAuth);

  useEffect(() => {
    if (user) {
      const { uid, photoURL, displayName } = user;
      if (displayName && uid) {
        setUser({ authorized: true, uid: uid, username: displayName, avatarUrl: photoURL ?? '' });
        navigate('/library');
      }
    }
  }, [user, loading, navigate]);

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
          navigate('/library');
        }
      }
    });
  };

  return (
    <main className="flex h-[100vh] w-full flex-col items-center justify-center">
      <h1 className="text-center text-[3rem] font-bold leading-[3rem]">
        <span className="text-accent">Play</span>
        <span className="text-primary">Later</span> – Your Personal Gaming Queue
      </h1>
      <div className="max-w-sm px-6 sm:px-0">
        <button
          className="dark:focus:ring-[#4285F4]/55 mb-2  mr-2 inline-flex w-full items-center justify-between rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"
          onClick={onGoogleLogin}
        >
          <svg
            className="-ml-1 mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            />
          </svg>
          {t('auth.googleSignIn')}
          <div />
        </button>
      </div>
    </main>
  );
};

export default Landing;
