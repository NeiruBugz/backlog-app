import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Loader } from '@widgets';

const Fallback = () => (
  <div className="w-screen h-screen flex justify-center items-center">
    <Loader />
  </div>
);

// eslint-disable-next-line react/display-name
const withRouter = (component: () => JSX.Element) => () =>
  (
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>{component()}</Suspense>
    </BrowserRouter>
  );

export { withRouter };
