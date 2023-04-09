import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { useStore } from '@nanostores/react';

import { nanoUser } from '@entities';

const Landing = lazy(() => import('./landing/index'));
const Home = lazy(() => import('./home/index'));
const Auth = lazy(() => import('./auth/index'));
const GamesList = lazy(() => import('./games-list/index'));
const AddGame = lazy(() => import('./add-game/index'));

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authorized } = useStore(nanoUser);

  if (!authorized) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const Routing = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/auth" element={<Auth />} />
    <Route
      path="/search"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />
    <Route
      path="/library"
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
);
export { Routing };
