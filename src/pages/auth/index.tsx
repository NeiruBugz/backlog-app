import { useAuth } from 'shared/api/useAuth';

const Auth = (): JSX.Element => {
  const { login } = useAuth();

  return (
    <div>
      <button onClick={login}>Auth</button>
    </div>
  );
};

export default Auth;
