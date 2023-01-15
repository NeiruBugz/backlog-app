import { Route, Routes } from 'react-router';
import { lazy } from 'react';
import { Header } from '@widgets';

const Home = lazy(() => import('./home/index'));
const Auth = lazy(() => import('./auth/index'));
const GamesList = lazy(() => import('./games-list/index'));
const AddGame = lazy(() => import('./add-game/index'));

const Routing = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/list" element={<GamesList />} />
        <Route path="/add-game" element={<AddGame />} />
      </Routes>
    </>
  );
};

export { Routing };
