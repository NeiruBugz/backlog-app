import { useNavigate } from 'react-router';

type UseAuthReturnType = {
  logout: () => void;
  login: () => void;
  checkAuth: () => boolean;
};

const useAuth = (): UseAuthReturnType => {
  const navigate = useNavigate();

  const login = (): void => {
    localStorage.setItem('authorized', '1');
    navigate('/games');
  };

  const logout = (): void => {
    localStorage.removeItem('authorized');
    navigate('/');
  };

  const checkAuth = (): boolean => {
    return Boolean(localStorage.getItem('authorized'));
  };

  return {
    login,
    logout,
    checkAuth,
  };
};

export { useAuth };
