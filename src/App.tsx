import 'normalize.css/normalize.css';
import './App.css';
import { useCallback, useState } from 'react';

import { Header, Card, AuthModal } from '@components';
import { useEscapeKeyPress } from './hooks/useEscapeKeyPress';
import { cardProps } from './mocks/data/card.mock';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  useEscapeKeyPress(useCallback(() => setModalOpen(false), []));

  return (
    <>
      <div className="container">
        <Header setModalOpen={setModalOpen} />
        <Card {...cardProps} />
      </div>
      <AuthModal isOpen={modalOpen} />
    </>
  );
}

export default App;
