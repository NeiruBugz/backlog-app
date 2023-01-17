import { Filter, Game } from '@entities';

const capitalize = (value: string): string => {
  return `${value[0].toUpperCase()}${value.substring(1)}`;
};

const createPlatformClassName = (platform: string) => {
  const lowercasedPlatform = platform.toLowerCase();
  if (lowercasedPlatform.includes('nintendo')) {
    return 'ba-card__platform--nintendo';
  }

  if (lowercasedPlatform.includes('playstation')) {
    return 'ba-card__platform--playstation';
  }

  if (lowercasedPlatform.includes('xbox')) {
    return 'ba-card__platform--xbox';
  }

  return 'ba-card__platform';
};

const filterCallback = (item: Game, filter: Filter, condition?: boolean): boolean => {
  if (condition) {
    return item.status === filter;
  }

  return false;
};

const filterCriteria: Filter[] = ['backlog', 'in-progress', 'completed'];

export { capitalize, createPlatformClassName, filterCallback, filterCriteria };
