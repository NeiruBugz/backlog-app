import { Input, Button, Form, Select } from 'antd';
import { useNavigate } from 'react-router';
import { v4 } from 'uuid';
import { PLATFORM_OPTIONS, STATUS_OPTIONS } from './constants';
import { addGame } from 'entities/game/models';
import type { Game } from '@entities';

const AddGame = (): JSX.Element => {
  const navigate = useNavigate();
  const onFinish = (values: Game) => {
    addGame({ ...values, id: v4() });
    navigate('/list');
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true, status: 'backlog' }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Game Title"
          name="title"
          rules={[{ required: true, message: 'Please input game title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Platform" name="platform" rules={[{ required: true, message: 'Please, choose a platform' }]}>
          <Select options={PLATFORM_OPTIONS} />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select options={STATUS_OPTIONS} value={'backlog'} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddGame;
