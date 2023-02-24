import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { v4 } from 'uuid';

import { SuggestBox } from '@widgets';
import { useAppDispatch } from '@shared';
import { addGame } from '@entities';

import type { ChangeEvent } from 'react';
import type { HowLongToBeatEntry } from 'howlongtobeat';
import type { SubmitHandler } from 'react-hook-form';
import type { RootState } from '@shared';
import type { Game } from '@entities';

import styles from './styles.module.scss';

import { PLATFORM_OPTIONS, STATUS_OPTIONS, translateStatus } from './constants';
import { Listbox } from '@headlessui/react';

type AddGameInputs = Pick<Game, 'title' | 'platform' | 'status'>;

const Select = ({
  selected,
  items,
}: {
  selected: { value: string; label: string };
  items: { value: string; label: string }[];
} & HTMLSelectElement) => (
  <Listbox value={selected.value} as="div" style={{ position: 'absolute' }}>
    <Listbox.Button>{selected.label}</Listbox.Button>
    <Listbox.Options style={{ position: 'absolute' }}>
      {items.map((item) => (
        <Listbox.Option key={item.value} value={item.value}>
          {item.label}
        </Listbox.Option>
      ))}
    </Listbox.Options>
  </Listbox>
);

const AddGame = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm<AddGameInputs>({
    defaultValues: {
      title: '',
    },
  });
  const payload = useSelector((state: RootState) => state.searchReducer);

  const [inputValue, setInputValue] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [entryValues, setEntryValues] = useState<Pick<HowLongToBeatEntry, 'imageUrl' | 'id'>>({
    imageUrl: '',
    id: '',
  });
  const [suggestBoxPosition, setSuggestBoxPosition] = useState({
    width: 0,
    left: 0,
    top: 0,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (payload && 'name' in payload) {
      setInputValue(payload);
    }

    return () => {
      setInputValue('');
    };
  }, [payload]);

  useLayoutEffect(() => {
    if (inputRef.current) {
      const { current } = inputRef;
      const { width, x, y, height } = current.getBoundingClientRect();
      setSuggestBoxPosition({ width, left: x, top: y + height });
    }
  }, [inputRef]);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setQuery(target.value);
    setInputValue(target.value);
  };

  const onSearchEntryClick = ({ name, imageUrl, id }: HowLongToBeatEntry) => {
    setInputValue(name);
    setEntryValues({
      imageUrl,
      id,
    });
    setQuery('');
  };

  const onFinish: SubmitHandler<AddGameInputs> = (values) => {
    if (!values.title || inputValue) {
      return;
    }

    const { id, imageUrl } = entryValues;
    dispatch(
      addGame({
        ...values,
        title: inputValue,
        id: id || v4(),
        img: imageUrl,
        createdAt: Date.now(),
      })
    );
    navigate('/list');
  };

  const statuses = useMemo(() => STATUS_OPTIONS.map((item) => translateStatus(item, t)), [t]);

  const { width, top, left } = suggestBoxPosition;

  return (
    <main className={styles['ba-add-game']}>
      <form onSubmit={handleSubmit(onFinish)} className={styles['ba-add-game__form']}>
        <label htmlFor="title" className={styles['ba-add-game__form-label']}>
          <span>{t('add-game.labels.title')}</span>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="title"
                placeholder="Enter game title"
                autoComplete="off"
                value={inputValue}
                onChange={onInputChange}
                ref={inputRef}
              />
            )}
          />
          {query ? (
            <SuggestBox
              query={query}
              onItemClick={onSearchEntryClick}
              width={width}
              xPos={left}
              yPos={top}
            />
          ) : null}
        </label>
        <label htmlFor="platform" className={styles['ba-add-game__form-label']}>
          <span>{t('add-game.labels.platform')}</span>
          <select
            id="platform"
            className={styles['ba-add-game__form-select']}
            {...register('platform', { required: true })}
          >
            {PLATFORM_OPTIONS.map((platform) => (
              <option value={platform.value} key={platform.value}>
                {platform.label}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="status" className={styles['ba-add-game__form-label']}>
          <span>{t('add-game.labels.status')}</span>
          <select
            id="status"
            className={styles['ba-add-game__form-select']}
            {...register('status', { required: true })}
          >
            {statuses.map((status) => (
              <option value={status.value} key={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export { AddGame };
