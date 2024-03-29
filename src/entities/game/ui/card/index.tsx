import { useState } from 'react';

import { Divider, Tag } from '@widgets';
import { deleteGameDocument, updateGameDocument } from '@shared';

import type { FC, MouseEventHandler } from 'react';
import type { Game as GameProps } from '@entities';
import { nanoDelete, nanoUpdate } from 'entities/game/slices/nano-games';

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
];

const GameCard: FC<GameProps> = ({ id, title, platform, img, status }) => {
  const [showDeleteAlert, setShowAlert] = useState<boolean>(false);

  const onAlertClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const { action } = event.currentTarget.dataset;

    if (action === 'submit') {
      deleteGameDocument(id, 'games').then(() =>
        nanoDelete(id)
      );
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
      <div className="card bg-base-100 shadow-xl image-full w-56 h-56 sm:w-64 sm:h-64 md:w-96 md:h-96">
        {showDeleteAlert ? (
          <div className="h-full w-full z-50 absolute flex justify-center items-center p-3">
            <div className="alert shadow-lg flex flex-col w-full">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info flex-shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Are you sure about that?</span>
              </div>
              <div className="flex-none">
                <button
                  className="btn btn-sm btn-ghost"
                  data-action="cancel"
                  onClick={onAlertClick}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  data-action="submit"
                  onClick={onAlertClick}
                >
                  I really want to delete it
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <figure>
          <img
            loading='lazy'
            src={img ? img : 'https://placehold.jp/1000x1000.png'}
            className="w-96 object-fill"
          />
        </figure>
        <div className="card-body flex flex-col">
          <div className="dropdown dropdown-end absolute right-2 cursor-pointer rounded-box z-10">
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
              className="menu menu-compact dropdown-content mt-3 p-2 shadow w-52 bg-primary-content text-primary"
            >
              <Divider>Statuses</Divider>
              {MENU_OPTIONS.filter((option) => option.key !== status).map((option) => (
                <li
                  key={option.key}
                  data-key={option.key}
                  onClick={onStatusChange}
                  className="hover:bg-primary-focus hover:text-primary-content rounded-none bg-primary-content p-2"
                >
                  {option.label}
                </li>
              ))}
              <Divider>Actions</Divider>
              <li>
                <button className="btn btn-warning" onClick={onDeleteClick}>
                  Delete
                </button>
              </li>
            </ul>
          </div>
          <h2 className="card-title">{title}</h2>
          <Tag platform={platform} />
        </div>
      </div>
    </>
  );
};

export { GameCard };
