import { Button, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import type { MenuProps } from 'antd';

interface DropdownWidgetProps extends MenuProps {
  label: string;
  classname?: string;
}

const DropdownWidget = ({ items, onClick, label, classname }: DropdownWidgetProps): JSX.Element => (
  <>
    <Dropdown className={classname} menu={{ items, onClick }}>
      <Button>
        {label}
        <DownOutlined />
      </Button>
    </Dropdown>
  </>
);

export { DropdownWidget };
