import { Route, Routes } from 'react-router';
import { lazy } from 'react';
import { Header } from '@widgets';

const Home = lazy(() => import('./home/index'));
const Auth = lazy(() => import('./auth/index'));
const GamesList = lazy(() => import('./games-list/index'));

const Routing = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/list" element={<GamesList />} />
      </Routes>
    </>
  );
};

export { Routing };
