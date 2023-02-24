import { Menu } from '@headlessui/react';

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

const DropdownWidget = ({ items, onClick, label, classname }: DropdownWidgetProps): JSX.Element => (
  <>
    <Menu as="div" className={classname}>
      <Menu.Button>{label}</Menu.Button>
      <Menu.Items as="div" style={{ position: 'absolute' }}>
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
