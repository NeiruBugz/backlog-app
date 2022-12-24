import { Route, Routes } from 'react-router';
import { lazy } from 'react';

const TestPage = lazy(() => import('./test/index'));

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<TestPage />} />
    </Routes>
  );
};

export { Routing };
