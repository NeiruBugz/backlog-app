import { Input, Button, Form, Select, InputRef } from 'antd';
import { useStore } from 'effector-react';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { v4 } from 'uuid';
import { PLATFORM_OPTIONS, STATUS_OPTIONS, translateStatus } from './constants';
import { $addPayload, addGame } from '@entities';
import type { Game } from '@entities';
import { HowLongToBeatEntry } from 'howlongtobeat';
import { SuggestBox } from '@widgets';
import { useTranslation } from 'react-i18next';

const AddGame = (): JSX.Element => {
  const [initialValues, setInitialValues] = useState({
    status: 'backlog',
  });
  const [inputValue, setInputValue] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();
  const { t } = useTranslation();
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
    setQuery(target.value);
    setInputValue(target.value);
  };

  const onSearchEntryClick = ({ name }: HowLongToBeatEntry) => {
    setInputValue(name);
    form.setFieldsValue({ title: name });
    setQuery('');
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

  const onFinish = (values: Game) => {
    addGame({ ...values, id: v4() });
    navigate('/list');
  };

  const statuses = useMemo(() => {
    return STATUS_OPTIONS.map((item) => translateStatus(item, t));
  }, [t]);


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
          label={t('add-game.labels.title')}
          name="title"
          rules={[{ required: true, message: t('validation.gameTitle') || '' }]}
        >
          <Input onChange={onInputChange} value={inputValue} ref={inputRef} autoComplete="off" />
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
          label={t('add-game.labels.platform')}
          name="platform"
          rules={[{ required: true, message: t('validation.gamePlatform') || '' }]}
        >
          <Select options={PLATFORM_OPTIONS} />
        </Form.Item>
        <Form.Item label={t('add-game.labels.status')} name="status">
          <Select options={statuses} value={'backlog'} />
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
