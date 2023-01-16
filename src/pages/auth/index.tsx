import { Button, Form, Input } from 'antd';
import { authUserFx } from 'entities/user/models';
import { User } from 'entities/user/types';
import { useNavigate } from 'react-router';

const Auth = (): JSX.Element => {
  const navigate = useNavigate();
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
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
          Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Auth;
