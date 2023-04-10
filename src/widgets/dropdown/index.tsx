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
  <div className="dropdown-start dropdown">
    <label tabIndex={0} className="btn m-1 bg-neutral-focus">
      {label}
    </label>
    <ul
      tabIndex={0}
      className="dropdown-content menu rounded-box w-max bg-primary-content p-2 text-primary shadow"
    >
      {items?.map((item) => (
        <li
          key={item.key}
          onClick={() => onClick(item.key)}
          className="rounded-none hover:bg-primary-focus hover:text-primary-content"
        >
          <button>{item.label}</button>
        </li>
      ))}
    </ul>
  </div>
);

export { DropdownWidget };
