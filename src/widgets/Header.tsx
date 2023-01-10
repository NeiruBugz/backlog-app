import { Link } from 'react-router-dom';
import { useAuth } from 'shared/api/useAuth';

const Header = (): JSX.Element => {
  const { checkAuth } = useAuth();
  
  return (
    <header>
      <Link to="/">
        Backlog App
      </Link>
      {'  '}
      {checkAuth() ? null : <Link to="/auth">Login</Link>}
    </header>
  );
};

export { Header };
