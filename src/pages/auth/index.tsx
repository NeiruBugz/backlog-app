import { useAuth } from '@shared';
import { Button } from 'antd';

const Auth = (): JSX.Element => {
  const { login } = useAuth();

  return (
    <div>
      <Button onClick={login}>Auth</Button>
    </div>
  );
};

export default Auth;
