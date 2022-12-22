import { useStore } from 'effector-react';
import { $auth } from '@store';
import { Button } from '@/ui/components';
import './header.css';

export const Header = ({
  setModalOpen,
}: {
  setModalOpen: (flag: boolean) => void;
}): JSX.Element => {
  const auth = useStore($auth);
  
  return (
    <header className="ba-header">
      <a href="src/ui/components#">Backlog App</a>
      {auth ? (
        <p className="ba-header__user">NeiruBugz</p>
      ) : (
        <div className="ba-header__buttons">
          <Button mode="primary" text="Sign in" onClick={() => setModalOpen(true)} />
          <Button mode="secondary" text="Sign up" onClick={() => setModalOpen(false)} />
        </div>
      )}
    </header>
  );
};
