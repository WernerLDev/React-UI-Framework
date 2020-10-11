import * as React from "react";
import { Pane } from "../../layouts";
import { MenuItem } from "../../global/types";
import { ButtonBarItem } from "./buttonbar-item";

import "./buttonbar.scss";

export interface IButtonBarProps {
  direction: "horizontal" | "vertical";
  reversed?: boolean;
  size: "small" | "big";
  items: MenuItem[];
  background?: string
}

export const ButtonBar = ({ direction, reversed, size, items, background }: IButtonBarProps) => {
  const height: number =
    size == "small" ? 50 : size == "big" ? 70 : 50;

  const flexDirection: "row" | "column" | "row-reverse" | "column-reverse" = 
    direction == "horizontal" && !reversed ? "row"
    : direction == "horizontal" && reversed ? "row-reverse"
    : direction == "vertical" && !reversed ? "column"
    : "column-reverse"
  
  return (
    <Pane 
      height={direction == "horizontal" ? height : undefined} 
      className="menubar" 
      overflow="initial"
      background={background ?? undefined}
    >
      <div 
        className={`menubar-container menubar-${direction}`}
        style={{
          flexDirection: flexDirection
        }}
      >
        {items.map((item, index) => (
          <ButtonBarItem
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
