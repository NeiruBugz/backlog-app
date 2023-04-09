import type { FC } from 'react';

interface DropDownItem {
  key: string;
  label: string;
}

interface DropdownWidgetProps {
  label: string;
  items: DropDownItem[];
  onClick: (key: string) => void;
}

const DropdownWidget: FC<DropdownWidgetProps> = ({ items, onClick, label }) => (
  <div className="dropdown dropdown-start">
    <label tabIndex={0} className="btn m-1 bg-neutral-focus">
      {label}
    </label>
    <ul
      tabIndex={0}
      className="dropdown-content menu p-2 shadow rounded-box w-max bg-primary-content text-primary"
    >
      {items?.map((item) => (
        <li
          key={item.key}
          onClick={() => onClick(item.key)}
          className="hover:bg-primary-focus hover:text-primary-content rounded-none"
        >
          <button>{item.label}</button>
        </li>
      ))}
    </ul>
  </div>
);

export { DropdownWidget };
