import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line react/display-name
const withRouter = (component: () => JSX.Element) => () =>
  <BrowserRouter>{component()}</BrowserRouter>;

export { withRouter };
