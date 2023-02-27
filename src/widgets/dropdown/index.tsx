import { Menu } from '@headlessui/react';

import type { FC } from 'react';

interface DropDownItem {
  key: string;
  label: string;
}

interface DropdownWidgetProps {
  label: string;
  classname?: string;
  items: DropDownItem[];
  onClick: (key: string) => void;
}

const DropdownWidget: FC<DropdownWidgetProps> = ({ items, onClick, label, classname }) => (
  <>
    <Menu as="div" className={classname}>
      <Menu.Button>{label}</Menu.Button>
      <Menu.Items as="div" style={{ position: 'absolute', zIndex: 1 }}>
        {items?.map((item) => (
          <Menu.Item as="div" key={item.key} onClick={() => onClick(item.key)}>
            <button>{item.label}</button>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  </>
);

export { DropdownWidget };
