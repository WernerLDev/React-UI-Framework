import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "./menu";
import { MenuItem } from "../../global/types";

export interface IMenuBarItemProps {
  size: "small" | "big";
  direction: "horizontal" | "vertical";
  item: MenuItem;
}

export const MenuBarItem = ({
  size,
  direction,
  item,
}: IMenuBarItemProps) => {
  const [submenuVisible, setSubmenuvisible] = React.useState(false);

  return (
    <>
      {item.kind == "action" ?
        <div className="button-wrapper">
        <button
          className={`menubar-btn ${size} ${item.disabled ? "disabled" : ""}`}
          onClick={() => {
            if (item.submenu) {
              setSubmenuvisible(!submenuVisible);
            } else {
              item.onClick();
            }
          }}
        >
          <FontAwesomeIcon color="#d7ecef" size="xs" icon={item.icon} />
          {item.label && <span>{item.label}</span>}
          {item.submenu && (
            <FontAwesomeIcon
              color="#d7ecef"
              size="xs"
              icon={direction == "horizontal" ? "caret-down" : "caret-right"}
            />
          )}
        </button>
        {submenuVisible && (
          <div className="submenu-container">
            <Menu
              items={item.submenu ?? []}
              onClose={() => setSubmenuvisible(false)}
            />
          </div>
        )}
      </div>
      :  item.kind == "element" ?
          item.element
      : item.kind == "divider" ?
          <>
            {direction == "horizontal" ? 
              <div className="divider horizontal"></div>
            :
              <div className="divider vertical"></div>
            }
          </>
      : null }
      
    </>
  );
};