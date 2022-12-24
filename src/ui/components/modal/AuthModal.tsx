import { Portal } from './Portal';
import './auth-modal.css';
import { login } from '@store';
import { Button, LabeledInput } from '@components';

const AuthModal = ({ isOpen }: { isOpen: boolean }): JSX.Element | null => {
  return isOpen ? (
    <Portal>
      <div className="ba-modal-overlay">
        <div className="ba-modal">
          <header className="ba-modal-header">Sign In</header>
          <div className="ba-modal-body">
            <form action="submit" className="ba-auth-form">
              <LabeledInput
                label='Login'
                inputType="text"
                inputId="login"
                inputName="login"
                labelClass='ba-auth-form-label'
                inputClass='ba-auth-form-input'
              />
              <LabeledInput
                label='Password'
                inputType="password"
                inputId="password"
                inputName="password"
                labelClass='ba-auth-form-label'
                inputClass='ba-auth-form-input'
              />
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
