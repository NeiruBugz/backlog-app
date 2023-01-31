import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { authUserFx } from 'entities/user/models';
import { User } from 'entities/user/types';
import { useNavigate } from 'react-router';

const Auth = (): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const onAuthClick = (values: Pick<User, 'username'>) => {
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
        onFinish={onAuthClick}
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
    </div>
  );
};

export { Auth };
