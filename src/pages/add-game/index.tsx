import { Game } from '@entities';
import { Input, Button, Form, Select } from 'antd';
import { addGame } from 'entities/game/models';
import { useNavigate } from 'react-router';
import { v4 } from 'uuid';

const PLATFORM_OPTIONS = [
  {
    value: 'playstation',
    label: 'Playstation',
  },
  {
    value: 'xbox',
    label: 'Xbox',
  },
  {
    value: 'nintendo',
    label: 'Nintendo',
  },
];

const STATUS_OPTIONS = [
  {
    value: 'backlog',
    label: 'Backlog',
  },
  {
    value: 'in-progress',
    label: 'In Progress',
  },
  {
    value: 'completed',
    label: 'Completed',
  },
];

const AddGame = (): JSX.Element => {
  const navigate = useNavigate();
  const onFinish = (values: Game) => {
    addGame({ ...values, id: v4() });
    navigate('/list');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Game Title"
          name="title"
          rules={[{ required: true, message: 'Please input game title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Platform" name="platform">
          <Select options={PLATFORM_OPTIONS} />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select options={STATUS_OPTIONS} />
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
