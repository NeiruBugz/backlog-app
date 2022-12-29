import { useStore } from 'effector-react';
import { auth } from '@store';
import { Button, Layout, Typography } from 'antd';
import './header.css';

export const Header = ({
  setModalOpen,
}: {
  setModalOpen: (flag: boolean) => void;
}): JSX.Element => {
  const isAuth = useStore(auth);
  
  return (
    <Layout.Header className='ba-header'>
      <Typography.Title level={4} className="ba-title">
        <a href="#">Backlog App</a>
      </Typography.Title>
      {isAuth ? (
        <p className="ba-header__user">NeiruBugz</p>
      ) : (
        <div className="ba-header__buttons">
          <Button type="primary" onClick={() => setModalOpen(true)}>Sign in</Button>
          <Button type="text" onClick={() => setModalOpen(false)}>Sign up</Button>
        </div>
      )}
    </Layout.Header>
  );
};
