import * as React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pane } from "../../layouts";

import "./menubar.scss";
import { MenuBarButton } from "./menubarbutton";

export type MenubarItem = {
  icon: IconProp;
  label?: string;
  disabled?: boolean;
  submenu?: MenubarItem[];
  onClick: () => void;
};

export interface IMenubarProps {
  direction: "horizontal" | "vertical";
  size: "small" | "big";
  items: MenubarItem[];
}

export const Menubar = ({ direction, size, items }: IMenubarProps) => {
  const height: number =
    size == "small" ? 50 : size == "big" ? 70 : 50;

  return (
    <Pane 
      height={direction == "horizontal" ? height : undefined} 
      background="#d7ecef" 
      className="menubar" 
      overflow="initial"
    >
      <div 
        className={`menubar-container menubar-${direction}`}
        style={{
          flexDirection: direction == "horizontal" ? "row" : "column"
        }}
      >
        {items.map((item, index) => (
          <MenuBarButton
            key={`menuitem${index}`}
            size={size}
            item={item}
          />
        ))}
      </div>
    </Pane>
  );
};
