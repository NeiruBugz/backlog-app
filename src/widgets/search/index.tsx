import { Input, message } from 'antd';
import { useTranslation } from 'react-i18next';

const { Search } = Input;

type SearchInputProps = {
  onSearch?: (searchQuery: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
};

const SearchInput = ({ onSearch, isLoading, disabled }: SearchInputProps): JSX.Element => {
  const { t } = useTranslation();
  const onMouseOver = () => {
    if (disabled) {
      message.info(t('systemMessages.searchUnavailiable'), 1);
    }
  };

  return (
    <Search
      placeholder={t('home.search.inputPlaceholder') || ''}
      allowClear
      enterButton={t('home.search.button')}
      size="large"
      onSearch={onSearch}
      loading={isLoading}
      disabled={disabled}
      onMouseOver={onMouseOver}
    />
  );
};

export { SearchInput };
