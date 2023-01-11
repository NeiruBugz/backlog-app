import { ReactNode, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line react/display-name
const withRouter = (component: () => ReactNode) => () => (
  <BrowserRouter>
    <Suspense fallback="Loading...">
      {component()}
    </Suspense>
  </BrowserRouter>
);

export { withRouter };
