import { Route, Routes } from 'react-router';
import { lazy } from 'react';

const Home = lazy(() => import('./home/index'));
const Auth = lazy(() => import('./auth/index'));
const GamesList = lazy(() => import('./games-list/index'));

const Routing = () => {
  return (
    <>
      <header>Backlog App</header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/list" element={<GamesList />} />
      </Routes>
    </>
  );
};

export { Routing };
