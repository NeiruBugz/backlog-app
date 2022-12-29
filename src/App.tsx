import 'normalize.css/normalize.css';
import './App.css';
import { useCallback, useState } from 'react';
import { Layout, Button, Space } from 'antd';

import { Card, AuthModal, Header } from '@components';
import { useEscapeKeyPress } from './hooks/useEscapeKeyPress';
import { useList } from 'effector-react';
import { addGame, gamesList } from '@store';
import { cardProps } from './mocks/data/card.mock';
import { Game } from './types/data/game';

const { Content, Sider } = Layout;

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  useEscapeKeyPress(useCallback(() => setModalOpen(false), []));

  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <Header setModalOpen={setModalOpen} />
        <Layout>
          <Sider width={200}>Sider</Sider>
          <Content>
            <div className="container">
              <Button type='primary' onClick={() => addGame(cardProps as Game)}>Add Persona 5</Button>
              <Space wrap>
                {useList(gamesList, (game) => <Card {...game} />)}
              </Space>
            </div>
          </Content>
        </Layout>
      </Layout>
      <AuthModal isOpen={modalOpen} onCancel={() => setModalOpen(false)} />
    </>
  );
}

export default App;
