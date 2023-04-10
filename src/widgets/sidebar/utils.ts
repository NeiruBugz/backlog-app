import { capitalize } from '@shared';

const LANGUAGE_ITEMS = [
  {
    key: 'ru',
    label: 'Russian',
  },
  {
    key: 'en',
    label: 'English',
  },
];

const THEMES = ['light', 'dark'];

const createThemeOptions = (
  translateCb: (key: string) => string
): { key: string; label: string }[] => {
  const themesOptions: { key: string; label: string }[] = [];
  THEMES.map((theme) =>
    themesOptions.push({ key: theme, label: capitalize(translateCb(`themes.${theme}`)) })
  );
  return themesOptions;
};

const STATUS_NAV = [
  {
    key: 'backlog',
    label: 'Backlog',
  },
  {
    key: 'in-progress',
    label: 'Playing',
  },
  {
    key: 'completed',
    label: 'Completed',
  },
  {
    key: 'abandoned',
    label: 'Abandoned',
  },
];

export { STATUS_NAV, LANGUAGE_ITEMS, THEMES, createThemeOptions };
