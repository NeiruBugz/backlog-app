import { Input, Button, Form, Select, InputRef } from 'antd';
import { useStore } from 'effector-react';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { HowLongToBeatEntry } from 'howlongtobeat';
import { useNavigate } from 'react-router';
import { v4 } from 'uuid';
import { PLATFORM_OPTIONS, STATUS_OPTIONS } from './constants';
import { $addPayload, addGame } from '@entities';
import type { Game } from '@entities';
import { SuggestBox } from '@widgets';

const AddGame = (): JSX.Element => {
  const [initialValues, setInitialValues] = useState({
    status: 'backlog',
  });
  const [query, setQuery] = useState<string>('');
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
  }, [form, payload]);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setQuery(target.value);
    setInputValue(target.value);
  };

  const onSearchEntryClick = ({ name }: HowLongToBeatEntry) => {
    setInputValue(name);
    form.setFieldsValue({ title: name });
    setQuery('');
  };

  const onFinish = (values: Game) => {
    addGame({ ...values, id: v4() });
    navigate('/list');
  };

  const width = useMemo(() => {
    if (inputRef.current) {
      return inputRef.current.input?.getBoundingClientRect().width;
    }
  }, []);

  const left = useMemo(() => {
    if (inputRef.current) {
      return inputRef.current.input?.getBoundingClientRect().x;
    }
  }, []);

  const top = useMemo(() => {
    if (inputRef?.current?.input) {
      return (
        inputRef.current.input?.getBoundingClientRect().y +
        inputRef.current.input?.getBoundingClientRect().height
      );
    }
  }, []);

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
        {query ? (
          <SuggestBox
            query={query}
            onItemClick={onSearchEntryClick}
            width={width}
            xPos={left}
            yPos={top}
          />
        ) : null}
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

export default AddGame;
