import { Button, Dropdown, MenuProps, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const DropdownWidget = ({
  items,
  onClick,
  label,
}: { label: string } & Pick<MenuProps, 'items' | 'onClick'>): JSX.Element => {
  return (
    <>
      <Dropdown menu={{ items, onClick }}>
        <Button>
          <Space>
            {label}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </>
  );
};

export { DropdownWidget };
