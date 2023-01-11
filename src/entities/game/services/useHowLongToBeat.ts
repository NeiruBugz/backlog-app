import { HowLongToBeatEntry, HowLongToBeatService } from 'howlongtobeat';

type UseHowLongToBeatReturnType = {
  search: (query: string) => Promise<HowLongToBeatEntry[]>;
};

const useHowLongToBeat = (): UseHowLongToBeatReturnType => {
  const howLongToBeat = new HowLongToBeatService();

  const search = async (query: string) => {
    const abort = new AbortController();
    const result = await howLongToBeat.search(query, abort.signal);
    return result;
  };

  return {
    search,
  };
};

export { useHowLongToBeat };
