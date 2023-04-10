import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Divider, Tag } from '@widgets';
import { nanoDelete, nanoUpdate } from '@entities';
import { deleteGameDocument, updateGameDocument } from '@shared';

import type { FC, MouseEventHandler } from 'react';
import type { Game as GameProps } from '@entities';

const MENU_OPTIONS = [
  {
    label: 'To backlog',
    key: 'backlog',
  },
  {
    label: 'Start',
    key: 'in-progress',
  },
  {
    label: 'Complete',
    key: 'completed',
  },
  {
    label: 'Abandon',
    key: 'abandoned',
  },
];

const GameCard: FC<GameProps> = ({ id, title, platform, img, status }) => {
  const { t } = useTranslation();
  const [showDeleteAlert, setShowAlert] = useState<boolean>(false);

  const onAlertClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const { action } = event.currentTarget.dataset;

    if (action === 'submit') {
      deleteGameDocument(id, 'games').then(() => nanoDelete(id));
    }

    setShowAlert(false);
  };

  const onStatusChange: MouseEventHandler<HTMLLIElement> = (event) => {
    const { key } = event.currentTarget.dataset;
    if (key) {
      updateGameDocument({ id, field: { key: 'status', value: key } }, 'games').then(() => {
        nanoUpdate({ id, field: { key: 'status', value: key } });
      });
    }
  };

  const onDeleteClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setShowAlert(true);
  };

  return (
    <>
      <div className="card image-full h-56 w-56 sm:h-64 sm:w-64 md:h-96 md:w-96">
        {showDeleteAlert ? <Alert t={t} onClick={onAlertClick} /> : null}
        <figure>
          <img
            loading="lazy"
            src={img ? img : 'https://placehold.jp/1000x1000.png'}
            className="w-96 object-fill"
          />
        </figure>
        <div className="card-body flex flex-col">
          <div className="dropdown-end dropdown rounded-box absolute right-2 z-10 cursor-pointer">
            <label tabIndex={0}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-three-dots-vertical absolute right-2 cursor-pointer fill-primary-content hover:fill-slate-500"
                viewBox="0 0 16 16"
              >
                {' '}
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />{' '}
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu menu-compact mt-3 w-52 bg-primary-content p-2 text-primary shadow"
            >
              <Divider>{t('games-list.cardMenu.statuses')}</Divider>
              {MENU_OPTIONS.filter((option) => option.key !== status).map((option) => (
                <li
                  key={option.key}
                  data-key={option.key}
                  onClick={onStatusChange}
                  className="rounded-none bg-primary-content p-2 hover:bg-primary-focus hover:text-primary-content"
                >
                  {t(`games-list.cardMenu.${option.key}`)}
                </li>
              ))}
              <Divider>{t('games-list.cardMenu.actions')}</Divider>
              <li>
                <button className="btn-warning btn" onClick={onDeleteClick}>
                  {t('games-list.cardMenu.delete')}
                </button>
              </li>
            </ul>
          </div>
          <div className="absolute bottom-0 left-0 h-1/3 w-full rounded-bl-[1rem] rounded-br-[1rem] bg-gradient-to-r from-[#2d2d2d] to-transparent pl-6 pt-4">
            <h2 className="card-title mb-2 text-[1.2em] text-primary-content">{title}</h2>
            <Tag platform={platform} />
          </div>
        </div>
      </div>
    </>
  );
};

export { GameCard };
