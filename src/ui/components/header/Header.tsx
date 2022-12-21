import './header.css';

export const Header = ({ setModalOpen }: { setModalOpen: (flag: boolean) => void; }): JSX.Element => {
  return (
    <header className="ba-header">
      <a href="src/ui/components#">Backlog App</a>
      <div className="ba-header__buttons">
        <button className="ba-button ba-button--primary" onClick={() => setModalOpen(true)}>Sign in</button>
        <button className="ba-button ba-button--secondary">Sign up</button>
      </div>
    </header>
  );
};