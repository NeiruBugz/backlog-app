import { withProviders } from './providers';
import { Routing } from '@pages';

import './index.scss';
import { Modal } from 'widgets/modal';

const App = () => (
  <>
    <Routing />
    <Modal />
  </>
);

export default withProviders(App);
