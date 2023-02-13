import { Navigate, Route, Routes } from 'react-router';
import { Header } from '@widgets';
import { Home } from './home';
import { Auth } from './auth';
import { AddGame } from './add-game';
import { GamesList } from './games-list';
import { useAppSelector } from 'app/providers/with-store';
import { getAuthState } from '@entities';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const authorized = useAppSelector(getAuthState);

  if (!authorized) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const Routing = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <GamesList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-game"
          element={
            <ProtectedRoute>
              <AddGame />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<p>There&apos;s nothing here: 404!</p>} />
      </Routes>
    </>
  );
};

export { Routing };
