import { Button, Dropdown, MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

type DropdownWidgetProps = {
  label: string;
  classname?: string;
} & Pick<MenuProps, 'items' | 'onClick'>;

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
