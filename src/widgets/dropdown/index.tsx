import { Button, Dropdown, MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

interface DropdownWidgetProps extends MenuProps {
  label: string;
  classname?: string;
}

const DropdownWidget = ({ items, onClick, label, classname }: DropdownWidgetProps): JSX.Element => {
  return (
    <>
      <Dropdown className={classname} menu={{ items, onClick }}>
        <Button>
          {label}
          <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
};

export { DropdownWidget };
