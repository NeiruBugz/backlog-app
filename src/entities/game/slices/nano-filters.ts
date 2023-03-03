import { atom } from 'nanostores';

const initialValue = {
  status: 'all',
  platform: 'all',
};

const filters = atom(initialValue);

const filterByStatus = function filterByStatus(filterCriteria: string) {
  filters.set({ ...filters.get(), status: filterCriteria });
};

const filterByPlatform = function filterByPlatform(filterCriteria: string) {
  filters.set({ ...filters.get(), platform: filterCriteria });
};

export {
  filters as nanoFilters,
  filterByStatus,
  filterByPlatform,
};
