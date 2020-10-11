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
  const [timeclosed, setTimeclosed] = React.useState(0)

  return (
    <>
      {item.kind == "action" ?
        <div className="button-wrapper">
          <button
            className={`menubar-btn ${size} ${item.disabled ? "disabled" : ""} ${submenuVisible ? "active" : ""}`}
            onClick={() => {
              if (item.submenu && (Date.now() - timeclosed) > 300) {
                setSubmenuvisible(!submenuVisible);
              } else if(item.submenu == null) {
                item.onClick();
              }
            }}
          >
            <FontAwesomeIcon color="#364156ff" size="xs" icon={item.icon} />
            {item.label && <span>{item.label}</span>}
            {item.submenu && (
              <FontAwesomeIcon
                color="#364156ff"
                size="xs"
                icon={direction == "horizontal" ? "caret-down" : "caret-right"}
              />
            )}
          </button>
          {submenuVisible && (
            <div className="submenu-container">
              <Menu
                items={item.submenu ?? []}
                onClose={() => {
                  setTimeclosed(Date.now())
                  setSubmenuvisible(false)
                }}
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