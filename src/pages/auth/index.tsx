import { Button, Form, Input, Typography, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { authUserFx } from 'entities/user/models';
import { User } from 'entities/user/types';
import { useNavigate } from 'react-router';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { NeccessaryCredentialSupport } from '@shared';
import jwtDecode from 'jwt-decode';

import styles from './styles.module.scss';

const Auth = (): JSX.Element => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const onGoogleSignIn = (resp: CredentialResponse) => {
    if (resp.credential) {
      const { name, picture } = jwtDecode(resp.credential) satisfies NeccessaryCredentialSupport;
      localStorage.setItem('token', resp.credential);
      authUserFx({ authorized: true, username: name, avatarUrl: picture });
      navigate('/list');
    }
  };

  const onBasicSignIn = (values: Pick<User, 'username'>) => {
    authUserFx({ authorized: true, username: values.username });
    navigate('/list');
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onBasicSignIn}
        autoComplete="off"
      >
        <Form.Item
          label={t('auth.label')}
          name="username"
          rules={[{ required: true, message: t('validation.username') || '' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {t('auth.submit')}
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <div className={styles['ba-auth__google-sign-in']}>
        <Typography className={styles['ba-auth__google-sign-in-prompt']}>Or use Google Sign In</Typography>
        <GoogleLogin onSuccess={onGoogleSignIn} locale={i18n.language} />
      </div>
    </div>
  );
};

export { Auth };
