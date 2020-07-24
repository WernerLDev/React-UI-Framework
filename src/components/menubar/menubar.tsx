import * as React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pane } from "../../layouts";

import "./menubar.scss";
import { MenuBarItem } from "./menubaritem";
import { MenuItem } from "../../global/types";


export interface IMenubarProps {
  direction: "horizontal" | "vertical";
  size: "small" | "big";
  items: MenuItem[];
}

export const Menubar = ({ direction, size, items }: IMenubarProps) => {
  const height: number =
    size == "small" ? 50 : size == "big" ? 70 : 50;

  return (
    <Pane 
      height={direction == "horizontal" ? height : undefined} 
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
          <MenuBarItem
            key={`menuitem${index}`}
            direction={direction}
            size={size}
            item={item}
          />
        ))}
      </div>
    </Pane>
  );
};
