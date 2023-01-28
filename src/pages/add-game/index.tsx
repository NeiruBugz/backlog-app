import { Input, Button, Form, Select, InputRef } from 'antd';
import { useStore } from 'effector-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { v4 } from 'uuid';
import { PLATFORM_OPTIONS, STATUS_OPTIONS } from './constants';
import { $addPayload, addGame } from '@entities';
import type { Game } from '@entities';

const AddGame = (): JSX.Element => {
  const [initialValues, setInitialValues] = useState({
    status: 'backlog',
  });
  const [inputValue, setInputValue] = useState<string>('');
  const navigate = useNavigate();
  const payload = useStore($addPayload);
  const [form] = Form.useForm<Game>();
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (payload) {
      setInitialValues((prevState) => {
        return {
          title: payload.name,
          ...prevState,
        };
      });
      setInputValue(payload.name);
      form.setFieldsValue({ title: payload.name });
    }

    return () => {
      setInputValue('');
      form.setFieldsValue({ title: '' });
    };
  }, [form, payload]);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(target.value);
  };

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
        initialValues={{ remember: true, ...initialValues }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="Game Title"
          name="title"
          rules={[{ required: true, message: 'Please input game title!' }]}
        >
          <Input onChange={onInputChange} value={inputValue} ref={inputRef} />
        </Form.Item>
        <Form.Item
          label="Platform"
          name="platform"
          rules={[{ required: true, message: 'Please, choose a platform' }]}
        >
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

export { AddGame };
