import 'normalize.css/normalize.css';
import './App.css';

import { Header } from './ui/components/header/Header';
import { Card } from './ui/components/card/Card';
import { useCallback, useState } from 'react';
import { AuthModal } from './ui/components/modal/AuthModal';
import { useEscapeKeyPress } from './hooks/useEscapeKeyPress';

const cardProps = {
  title: 'Persona 5 Royal',
  img: '',
  platform: 'Nintendo Switch'
};

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  useEscapeKeyPress(useCallback(() => setModalOpen(false), []));

  return (
    <>
      <div className="container">
        <Header setModalOpen={setModalOpen}/>
        <Card {...cardProps} />
      </div>
      <AuthModal isOpen={modalOpen} />
    </>
  );
}

export default App;
