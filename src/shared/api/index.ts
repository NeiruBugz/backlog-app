import { HowLongToBeatEntry } from 'howlongtobeat';
import { Game } from '@entities';

const API_URL = import.meta.env.DEV
  ? import.meta.env.VITE_DEV_API
  : 'https://backlog-app-nest.vercel.app/';

const api = {
  search: function (query: string): Promise<Array<HowLongToBeatEntry>> {
    return new Promise((resolve, reject) => {
      fetch(`${API_URL}/search/${query}`)
        .then((response) => {
          resolve(response.json());
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getGames: function () {
    return new Promise((resolve, reject) => {
      fetch(`${API_URL}/games`).then((response) => {
        if (response.status === 200) {
          resolve(response.json());
        }

        reject([]);
      });
    });
  },
  getGame: function (id: string) {
    return new Promise((resolve, reject) => {
      fetch(`${API_URL}/games/${id}`).then((response) => {
        if (response.status === 200) {
          resolve(response.json());
        }

        reject('No game found');
      });
    });
  },
  updateGame: function (id: string, payload: Partial<Game>) {
    return new Promise((resolve, reject) => {
      fetch(`${API_URL}/games/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        if (response.status === 200) {
          resolve(response.json());
        }

        reject(false);
      });
    });
  },
  addGame: function (payload: Game) {
    return new Promise((resolve, reject) => {
      fetch(`${API_URL}/games`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (response.status === 200) {
          resolve(response.json());
        }

        reject(false);
      });
    });
  },
};

export { api };
