import { NavLink, Text } from '@mantine/core';
import getPathWithSearchParams from '@utils/getPathWithSearchParams';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export type MenuBarItem = {
  label: string;
  path: string;
  disabled?: boolean;
};

interface MenuBarProps {
  title?: string;
  onClick?: (path: string) => void;
  activeMenu?: string;
  menus: MenuBarItem[];
  width?: string | number;
  classNames?: { root?: string; title?: string; menuTitle?: string };
}

function MenuBar({
  title,
  onClick,
  activeMenu,
  menus = [],
  width = 300,
  classNames = { root: '', title: '', menuTitle: '' },
}: MenuBarProps) {
  const navigate = useNavigate();
  const [tempActiveMenu, setTempActiveMenu] = useState(
    activeMenu || menus[0].path
  );

  return (
    <div
      style={{ width }}
      className={twMerge(
        'bg-white h-fit rounded-md border',
        classNames.root
      )}
    >
      {title && (
        <Text
          className={twMerge(
            'text-primary-main border-b p-4 font-bold',
            classNames.title
          )}
        >
          {title}
        </Text>
      )}
      <div className="p-5">
        {menus?.map((m) => (
          <NavLink
            key={`${m?.label}-${m.path}`}
            className="my-2 rounded-md px-4 py-3 font-medium"
            classNames={{
              label: 'text-sm',
              root: 'data-[active=true]:bg-base-background data-[active=true]:text-primary-main',
            }}
            active={
              tempActiveMenu === m?.path ||
              getPathWithSearchParams() === m?.path
            }
            label={m?.label}
            disabled={m?.disabled}
            onClick={
              onClick
                ? () => onClick(m?.path)
                : () => {
                    setTempActiveMenu(m?.path);
                    navigate(m?.path);
                    if (m?.path?.includes('#')) {
                      const id = m.path.split('#')[1];
                      document.getElementById(id)?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                      });
                    }
                  }
            }
          />
        ))}
      </div>
    </div>
  );
}

export default MenuBar;
