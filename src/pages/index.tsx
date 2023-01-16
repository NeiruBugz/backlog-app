import { Navigate, Route, Routes } from 'react-router';
import { lazy } from 'react';
import { Header } from '@widgets';
import { useStore } from 'effector-react';
import { $user } from 'entities/user/models';

const Home = lazy(() => import('./home/index'));
const Auth = lazy(() => import('./auth/index'));
const GamesList = lazy(() => import('./games-list/index'));
const AddGame = lazy(() => import('./add-game/index'));

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
        <Route path="/list" element={<ProtectedRoute><GamesList /></ProtectedRoute>} />
        <Route path="/add-game" element={<ProtectedRoute><AddGame /></ProtectedRoute>} />
        <Route path="*" element={<p>There&apos;s nothing here: 404!</p>} />
      </Routes>
    </>
  );
};

export { Routing };
