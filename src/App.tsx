import 'normalize.css/normalize.css';
import './App.css';
import { useCallback, useState } from 'react';

import { Header, Card, AuthModal, Button } from '@components';
import { useEscapeKeyPress } from './hooks/useEscapeKeyPress';
import { cardProps } from './mocks/data/card.mock';
import { useList } from 'effector-react';
import { addGame, gamesList, removeGame } from '@store';
import { Game } from './types/data/game';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  useEscapeKeyPress(useCallback(() => setModalOpen(false), []));

  return (
    <>
      <div className="container">
        <Header setModalOpen={setModalOpen} />
        <Button mode={'primary'} text={'Add Persona 5'} onClick={() => addGame(cardProps as Game)} />
        <Button mode={'secondary'} text={'Remove Persona 5'} onClick={() => removeGame('Persona 5 Royal')} />
        {useList(gamesList, (game) => <Card {...game} />)}
      </div>
      <AuthModal isOpen={modalOpen} />
    </>
  );
}

export default App;
