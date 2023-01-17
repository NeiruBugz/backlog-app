import { Button, Dropdown, MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const DropdownWidget = ({
  items,
  onClick,
  label,
  classname
}: { label: string, classname?: string } & Pick<MenuProps, 'items' | 'onClick'>): JSX.Element => {
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
