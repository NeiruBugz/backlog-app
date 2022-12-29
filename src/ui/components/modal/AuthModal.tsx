import { Modal } from 'antd';
import './auth-modal.css';
import { login } from '@store';
import { Button, LabeledInput } from '@components';

const AuthModal = ({ isOpen, onCancel }: { isOpen: boolean, onCancel: () => void; }): JSX.Element | null => {
  return isOpen ? (
    <div className="ba-modal-overlay">
      <Modal centered footer={null} title='Sign In' className="ba-modal" open={isOpen} onCancel={onCancel}>
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
      </Modal>
    </div>
  ) : null;
};

export { AuthModal };
