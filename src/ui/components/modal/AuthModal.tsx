import { Portal } from './Portal';
import './auth-modal.css';
import { login } from '@store';
import { Button } from '@components';

const AuthModal = ({ isOpen }: { isOpen: boolean }): JSX.Element | null => {
  return isOpen ? (
    <Portal>
      <div className="ba-modal-overlay">
        <div className="ba-modal">
          <header className="ba-modal-header">Sign In</header>
          <div className="ba-modal-body">
            <form action="submit" className="ba-auth-form">
              <label htmlFor="login" className="ba-label ba-auth-form-label">
                Login
                <input
                  type="text"
                  name="login"
                  id="login"
                  className="ba-input ba-auth-form-input"
                />
              </label>
              <label htmlFor="password" className="ba-label ba-auth-form-label">
                Password
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="ba-input ba-auth-form-input"
                />
              </label>
              <div className="ba-auth-form-buttons">
                <Button mode="primary" onClick={login} text='Sign in' />
                <button className="ba-button ba-button--secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Portal>
  ) : null;
};

export { AuthModal };
