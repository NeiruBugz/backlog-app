import type { MouseEventHandler } from 'react';

const Alert = ({
  t,
  onClick,
}: {
  t: (translatableString?: string | string[]) => string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => (
  <div className="absolute z-50 flex h-full w-full items-center justify-center p-3">
    <div className="alert flex w-full flex-col shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 flex-shrink-0 stroke-info"
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
        <button className="btn-ghost btn-sm btn" data-action="cancel" onClick={onClick}>
          {t('games-list.cardMenu.cancelDelete')}
        </button>
        <button className="btn-primary btn-sm btn" data-action="submit" onClick={onClick}>
          {t('games-list.cardMenu.confirmDelete')}
        </button>
      </div>
    </div>
  </div>
);

export { Alert };
