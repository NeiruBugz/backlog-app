import { capitalize } from '@shared';

const LANGUAGE_ITEMS = [
  {
    key: 'ru',
    label: '🇷🇺',
  },
  {
    key: 'en',
    label: '🇺🇸',
  },
];

const LANGUAGE_OPTIONS = [
  { id: 1, name: '🇷🇺', unavailiable: false },
  { id: 2, name: '🇺🇸', unavailiable: false },
];

const THEMES = [
  'light',
  'dark',
  'emerald',
  'corporate',
  'synthwave',
  'cyberpunk',
  'pastel',
  'fantasy',
];

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

export { STATUS_NAV, LANGUAGE_ITEMS, THEMES, LANGUAGE_OPTIONS, createThemeOptions };
