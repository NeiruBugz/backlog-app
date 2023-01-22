import { Input } from 'antd';

const { Search } = Input;

type SearchInputProps = {
  onSearch?: (searchQuery: string) => void;
  isLoading?: boolean;
};

const SearchInput = ({ onSearch, isLoading }: SearchInputProps): JSX.Element => {
  return (
    <Search
      placeholder="Search game"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
      loading={isLoading}
    />
  );
};

export { SearchInput };
