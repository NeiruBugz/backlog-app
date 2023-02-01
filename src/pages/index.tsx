import { Navigate, Route, Routes } from 'react-router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Header } from '@widgets';
import { useStore } from 'effector-react';
import { $user } from 'entities/user/models';
import { Home } from './home';
import { AddGame } from './add-game';
import { GamesList } from './games-list';
import { useEffect } from 'react';
import { message } from 'antd';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authorized } = useStore($user);

  if (!authorized) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const Routing = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_KEY;
  console.log(import.meta.env);
  console.log(clientId);
  
  useEffect(() => {
    if (!clientId) {
      message.error('Google error', 1);
    }
  }, [clientId]);
  return (
    <GoogleOAuthProvider clientId={clientId.trim()}>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
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
    </GoogleOAuthProvider>
  );
};

export { Routing };
