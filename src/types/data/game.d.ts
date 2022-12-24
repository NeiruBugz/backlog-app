type Platform = 'playstation' | 'nintendo' | 'xbox' | 'pc';

export type Game = {
    title: string;
    platform: Platform;
    img?: string;
};