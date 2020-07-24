import * as React from "react";
import { ClickOutside } from "../../layouts/clickoutside/clickoutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import './menu.scss'
import { MenuButton } from "./menubutton";
import { MenuItem } from "../../global/types";

export interface IMenuProps {
  items: MenuItem[];
  onClose: () => void;
}

export const Menu = ({ items, onClose }: IMenuProps) => {

  return (
    <div className="menu-container">
      <ClickOutside onClickOutside={onClose}>
        {items.map((item, index) => (
          <MenuButton key={`menuitem${index}`} item={item} />
        ))}
      </ClickOutside>
    </div>
  );
};
