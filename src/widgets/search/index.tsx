import { Input, message } from 'antd';

const { Search } = Input;

type SearchInputProps = {
  onSearch?: (searchQuery: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
};

const SearchInput = ({ onSearch, isLoading, disabled }: SearchInputProps): JSX.Element => {
  const onMouseOver = () => {
    if (disabled) {
      message.info('You should be logged in to use search', 1);
    }
  };

  return (
    <Search
      placeholder="Search game"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
      loading={isLoading}
      disabled={disabled}
      onMouseOver={onMouseOver}
    />
  );
};

export { SearchInput };
