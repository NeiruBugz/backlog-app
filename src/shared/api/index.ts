import type { Game } from '@entities';

const API_URL = 'http://localhost:8080/';

const getGames = (): Promise<Game[]> => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8080/games').then((result) => {
      if (result.status === 200) {
        resolve(result.json());
      }

      reject([]);
    });
  });
};

const getGame = (id: string): Promise<string | Game> => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}games/${id}`).then((result) => {
      if (result.status === 200) {
        resolve(result.json());
      }

      reject('No game found');
    });
  });
};

const updateGame = (id: string, payload: Partial<Game>) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}games/${id}`, {
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
};

const addGame = (payload: Game): Promise<Response> => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8080/games', {
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
};

export const api = {
  getGame,
  getGames,
  addGame,
  updateGame,
};
