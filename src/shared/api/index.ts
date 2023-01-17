import type { Game } from '@entities';

const API_URL = 'http://localhost:8080';

const api = {
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

const inMemoryApi = {};

export { api, inMemoryApi };
