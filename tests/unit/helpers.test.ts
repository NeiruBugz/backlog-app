import { createPlatformClassName } from '../../src/shared/helpers';

const NINTENDO_PLATFORMS = [
  'Nintendo Switch',
  'Nintendo GameCube',
  'wii',
  'wii u',
  'nes',
  'snes',
  'NINTENDO SWITCH',
  'nInTEnDO GameCUBE',
];
const NINTENDO_CLASSNAME = 'ba-tag__platform--nintendo';
const PLAYSTATION_PLATFORMS = ['Playstation Portable', 'Playstation 4', 'PLAYSTATION 2', 'PlAyStaTION 3'];
const PLAYSTATIN_CLASSNAME = 'ba-tag__platform--playstation';
const XBOX_PLATFORMS = ['Xbox', 'Xbox 360', 'XBOX ONE', 'xBoX Series S/x'];
const XBOX_CLASSNAME = 'ba-tag__platform--xbox';

describe('Helpers', () => {
  describe('createPlatformClassName', () => {
    it('should return Nintendo classname', () => {
      NINTENDO_PLATFORMS.forEach((platform) => {
        expect(createPlatformClassName(platform)).toBe(NINTENDO_CLASSNAME);
      });
    });

    it('should return Xbox classname', () => {
      XBOX_PLATFORMS.forEach((platform) => {
        expect(createPlatformClassName(platform)).toBe(XBOX_CLASSNAME);
      });
    });

    it('should return Playstation classname', () => {
      PLAYSTATION_PLATFORMS.forEach((platform) => {
        expect(createPlatformClassName(platform)).toBe(PLAYSTATIN_CLASSNAME);
      });
    });
  });
});
