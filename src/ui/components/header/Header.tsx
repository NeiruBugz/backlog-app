import './header.css';

const useSelector = (stateObj: any) => {return { auth: !true };};

export const Header = ({ setModalOpen }: { setModalOpen: (flag: boolean) => void; }): JSX.Element => {
  const { auth } = useSelector({});
  return (
    <header className="ba-header">
      <a href="src/ui/components#">Backlog App</a>
      {auth ? <p className='ba-header__user'>NeiruBugz</p> :<div className="ba-header__buttons">
        <button className="ba-button ba-button--primary" onClick={() => setModalOpen(true)}>Sign in</button>
        <button className="ba-button ba-button--secondary">Sign up</button>
      </div>}
    </header>
  );
};