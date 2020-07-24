import * as React from "react";
import { MenubarItem } from "./menubar";
import { ClickOutside } from "../../layouts/clickoutside/clickoutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import './menu.scss'

export interface IMenuProps {
  items: MenubarItem[];
  onClose: () => void;
}

export const Menu = ({ items, onClose }: IMenuProps) => {

  const [submenuopen, setSubmenuopen] = useState(false);

  return (
    <div className="menu-container">
      <ClickOutside onClickOutside={onClose}>
        {items.map((item, index) => (
          <div key={`menuitem${index}`} className="button-container">
            <button
              onClick={() => {
                if(item.submenu) setSubmenuopen(!submenuopen)
                else item.onClick()
              }}
            >
              <FontAwesomeIcon color="#57b7d1" size="xs" icon={item.icon} />
              {item.label && <span>{item.label}</span>}
              {item.submenu && (
                <FontAwesomeIcon
                  color="#a9a9a9"
                  size="xs"
                  icon={"caret-right"}
                />
              )}
            </button>
            {item.submenu && submenuopen && 
              <div className="submenu">
                <Menu 
                  items={item.submenu}
                  onClose={() => setSubmenuopen(false)}
                />
              </div>
            }
          </div>
        ))}
      </ClickOutside>
    </div>
  );
};
