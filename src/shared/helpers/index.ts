import type { Filter, Game } from '@entities';

const NINTENDO_PLATFORMS = ['wii', 'wii u', 'nes', 'snes'];

const preparePlatform = (value: string): string => {
  if (value.toLowerCase() === 'pc') {
    return 'PC';
  }

  return capitalize(value);
};

const capitalize = (value: string): string => `${value[0].toUpperCase()}${value.substring(1)}`;

const createPlatformClassName = (platform: string) => {
  const lowercasedPlatform = platform.toLowerCase();
  if (lowercasedPlatform.includes('nintendo') || NINTENDO_PLATFORMS.includes(lowercasedPlatform)) {
    return 'ba-tag__platform--nintendo';
  }

  if (lowercasedPlatform.includes('playstation')) {
    return 'ba-tag__platform--playstation';
  }

  if (lowercasedPlatform.includes('xbox')) {
    return 'ba-tag__platform--xbox';
  }

  if (lowercasedPlatform.includes('pc')) {
    return 'ba-tag__platform--pc';
  }

  return 'ba-tag__platform';
};

const filterCallback = (item: Game, filter: Filter, condition?: boolean): boolean => {
  if (condition) {
    return item.status === filter;
  }

  return false;
};

const pluralTranslate = (count: number): string => {
  let ending = '';
  const stringifiedCount = count.toString();
  const numberedLastChar = Number(stringifiedCount.charAt(stringifiedCount.length - 1));

  const inBetween = (val: number, min: number, max: number): boolean => val >= min && val <= max;

  if (count === 1 || numberedLastChar == 1) {
    ending = 'hours_one';
  } else {
    if (
      (stringifiedCount.length >= 2 && inBetween(numberedLastChar, 2, 4)) ||
      inBetween(count, 2, 4)
    ) {
      ending = 'hours_few';
    } else if (numberedLastChar > 4 || count > 4) {
      ending = 'hours_many';
    }
  }

  return ending;
};

const filterCriteria: Filter[] = ['backlog', 'in-progress', 'completed'];

const getLanguageLabel = (language: string) => {
  if (language.includes('ru')) {
    return '🇷🇺';
  } else {
    return '🇺🇸';
  }
};

export {
  capitalize,
  createPlatformClassName,
  filterCallback,
  filterCriteria,
  preparePlatform,
  pluralTranslate,
  getLanguageLabel,
};
