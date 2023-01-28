import { Navigate, Route, Routes } from 'react-router';
import { lazy } from 'react';
import { Header } from '@widgets';
import { useStore } from 'effector-react';
import { $user } from 'entities/user/models';
import { Home } from './home';
import { Auth } from './auth';
import { AddGame } from './add-game';
import { GamesList } from './games-list';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authorized } = useStore($user);

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
