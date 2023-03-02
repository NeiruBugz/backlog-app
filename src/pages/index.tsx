import { Navigate, Route, Routes } from 'react-router';
import { useStore } from '@nanostores/react';
import { Home } from './home';
import { Auth } from './auth';
import { AddGame } from './add-game';
import { GamesList } from './games-list';
import { Header } from '@widgets';
import { nanoUser } from 'entities/user/slice/index';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authorized } = useStore(nanoUser);

  if (!authorized) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const Routing = () => (
  <div className="container mx-auto">
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
  </div>
);
export { Routing };
