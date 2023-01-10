import { Route, Routes } from 'react-router';
import { lazy } from 'react';

const TestPage = lazy(() => import('./home/index'));

const Routing = () => {
  return (
    <>
      <header>Backlog App</header>
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/auth" element={<div>Auth</div>} />
      </Routes>
    </>
  );
};

export { Routing };
