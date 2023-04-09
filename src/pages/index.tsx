import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { useStore } from '@nanostores/react';

import { filterByPlatform, filterByStatus, nanoFilters, user } from '@entities';
import { Sidebar } from '@widgets';

import type { MouseEventHandler } from 'react';
import { setModal } from 'widgets/modal/modal';
import { useWindowWidth } from '@shared';

const Landing = lazy(() => import('./landing/index'));
const Home = lazy(() => import('./home/index'));
const Auth = lazy(() => import('./auth/index'));
const GamesList = lazy(() => import('./games-list/index'));
const AddGame = lazy(() => import('./add-game/index'));
const Roulette = lazy(() => import('./roulette/index'));
const Development = lazy(() => import('./development/index'));

const CustomRoute = ({ children }: { children: JSX.Element }) => {
  const { goToDev } = useWindowWidth();

  useEffect(() => {
    goToDev();
  }, [goToDev]);

  return children;
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authorized } = useStore(user);

  if (!authorized) {
    return <Navigate to="/" replace />;
  }

  return <RouteWithSidebar><CustomRoute>{children}</CustomRoute></RouteWithSidebar>;
};

const RouteWithSidebar = ({ children }: { children: JSX.Element }) => {
  const filters = useStore(nanoFilters);

  useEffect(() => {
    const onSearchShortcut = (event: KeyboardEvent) => {
      if (event.key === '/') {
        setModal({ id: 'search', isVisible: true });
      }
    };

    document.addEventListener('keyup', onSearchShortcut);

    return () => {
      document.removeEventListener('keyup', onSearchShortcut);
    };
  }, []);

  const onFilter: MouseEventHandler<HTMLLIElement> = (event) => {
    const { field, value } = event.currentTarget.dataset;

    if (value) {
      if (field === 'platform') {
        filterByPlatform(value);
      } else if (field === 'status') {
        filterByStatus(value);
      }
    }
  };

  return (
    <main className="flex w-full h-full">
      <Sidebar {...filters} onFilter={onFilter} />
      <section className="container mx-auto w-full h-full p-4 bg-current relative">
        {children}
      </section>
    </main>
  );
};

const Routing = () => (
  <Routes>
    <Route path="/" element={<CustomRoute><Landing /></CustomRoute>} />
    <Route path="/auth" element={<CustomRoute><Auth /></CustomRoute>} />
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
    <Route
      path="/roulette"
      element={
        <ProtectedRoute>
          <Roulette />
        </ProtectedRoute>
      }
    />
    <Route path="/in-dev" element={<Development />} />
    <Route path="*" element={<p>There&apos;s nothing here: 404!</p>} />
  </Routes>
);
export { Routing };
