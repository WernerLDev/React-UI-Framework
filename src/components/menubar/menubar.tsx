import * as React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pane } from "../../layouts";

import "./menubar.scss";

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
    <Pane height={height} background="#d7ecef" className="menubar">
      <div 
        className="menubar-container"
        style={{
          flexDirection: direction == "horizontal" ? "row" : "column"
        }}
      >
        {items.map((item, index) => (
          <>
            <button
              key={`menuitem${index}`}
              className={`menubar-btn ${size} ${item.disabled ? "disabled" : ""}`}
              onClick={() => item.onClick()}
            >
              <FontAwesomeIcon color="#d7ecef" size="xs" icon={item.icon} />
              {item.label && <span>{item.label}</span>}
            </button>
            {item.submenu && (
              <button className={`menubar-submenu-btn ${size}`}>
                <FontAwesomeIcon color="#d7ecef" size="xs" icon="caret-down" />
              </button>
            )}
          </>
        ))}
      </div>
    </Pane>
  );
};
