import type { MouseEventHandler } from 'react';

const Alert = ({
  t,
  onClick,
}: {
  t: (translatableString?: string | string[]) => string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => (
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
        <span>{t('games-list.cardMenu.deleteAlertText')}</span>
      </div>
      <div className="flex-none">
        <button className="btn btn-sm btn-ghost" data-action="cancel" onClick={onClick}>
          {t('games-list.cardMenu.cancelDelete')}
        </button>
        <button className="btn btn-sm btn-primary" data-action="submit" onClick={onClick}>
          {t('games-list.cardMenu.confirmDelete')}
        </button>
      </div>
    </div>
  </div>
);

export { Alert };
