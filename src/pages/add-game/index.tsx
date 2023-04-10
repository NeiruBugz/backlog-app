import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useStore } from '@nanostores/react';

import { SuggestBox, Loader } from '@widgets';
import { user, resetPayload, search } from '@entities';
import { addDocument } from '@shared';

import type { ChangeEvent } from 'react';
import type { HowLongToBeatEntry } from 'howlongtobeat';
import type { SubmitHandler } from 'react-hook-form';
import type { Game } from '@entities';

import { PLATFORM_OPTIONS, STATUS_OPTIONS, translateStatus } from './constants';

type AddGameInputs = Pick<Game, 'title' | 'platform' | 'status'>;

const AddGame = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { uid } = useStore(user);
  const { name, imageUrl } = useStore(search);

  const { register, handleSubmit, control } = useForm<AddGameInputs>({
    defaultValues: {
      title: '',
    },
  });

  const [inputValue, setInputValue] = useState<string>(name ?? '');
  const [query, setQuery] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
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

  useEffect(() => {
    if (name) {
      setInputValue(name);
      setEntryValues({ imageUrl, id: '' });
    }
  }, [name, imageUrl]);

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
    setLoading(true);
    const { imageUrl } = entryValues;
    const gameData: Omit<Game, 'id'> = {
      ...values,
      title: inputValue,
      img: imageUrl,
      createdAt: Date.now(),
      review: '',
      rating: 0,
    };
    addDocument({ ...gameData, user: uid }, 'games').then(() => {
      setLoading(false);
      resetPayload();
      navigate('/library');
    });
  };

  const statuses = useMemo(() => STATUS_OPTIONS.map((item) => translateStatus(item, t)), [t]);

  const { width, top, left } = suggestBoxPosition;

  return (
    <main className="flex items-center justify-center">
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onFinish)} className="form-control w-full max-w-md">
          <label htmlFor="title" className="label">
            <span className="label-text text-lg text-primary-content">
              {t('add-game.labels.title')}
            </span>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="title"
                  placeholder={t('add-game.titlePlaceholder') ?? ''}
                  autoComplete="off"
                  value={inputValue}
                  onChange={onInputChange}
                  ref={inputRef}
                  className="input-bordered input w-full max-w-xs"
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
          <label htmlFor="platform" className="label">
            <span className="label-text text-lg text-primary-content">
              {t('add-game.labels.platform')}
            </span>
            <select
              id="platform"
              className="select-bordered select"
              {...register('platform', { required: true })}
            >
              {PLATFORM_OPTIONS.map((platform) => (
                <option value={platform.value} key={platform.value}>
                  {platform.label}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="status" className="label">
            <span className="label-text text-lg text-primary-content">
              {t('add-game.labels.status')}
            </span>
            <select
              id="status"
              className="select-bordered select"
              {...register('status', { required: true })}
            >
              {statuses.map((status) => (
                <option value={status.value} key={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn-primary btn">
            {t('add-game.submitButton')}
          </button>
        </form>
      )}
    </main>
  );
};

// export { AddGame };

export default AddGame;
