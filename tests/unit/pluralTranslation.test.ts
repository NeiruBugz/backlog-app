import { pluralTranslate } from '../../src/shared/helpers';

const TRANSLATIONS = {
  one: 'hours_one',
  few: 'hours_few',
  many: 'hours_many',
};

const ONE = [1, 31, 1001];

const FEW = [2, 3, 4, 1002, 62, 102];

const MANY = [5, 12, 20, 1000, 1005];

describe('Plural translate', () => {
  ONE.forEach((item) => {
    it(`should return "hour_one" when called with ${item}`, () => {
      expect(pluralTranslate(item)).toBe(TRANSLATIONS.one);
    });
  });

  FEW.forEach((item) => {
    it(`should return "hour_few" when called with ${item}`, () => {
      expect(pluralTranslate(item)).toBe(TRANSLATIONS.few);
    });
  });

  MANY.forEach((item) => {
    it(`should return "hour_many" when called with ${item}`, () => {
      expect(pluralTranslate(item)).toBe(TRANSLATIONS.many);
    });
  });
});
