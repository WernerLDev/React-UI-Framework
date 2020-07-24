import * as React from 'react';
import { MenubarItem, Menubar } from './menubar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClickOutside } from '../../layouts/clickoutside/clickoutside';
import { Menu } from './menu';

export interface IMenuBarButtonProps {
    size: "small" | "big",
    direction: "horizontal" | "vertical"
    item: MenubarItem
}

export const MenuBarButton = ( {size, direction, item}: IMenuBarButtonProps ) => {
    
    const [submenuVisible, setSubmenuvisible] = React.useState(false);


    return (
        <div className="button-wrapper">
            <button
                className={`menubar-btn ${size} ${item.disabled ? "disabled" : ""}`}
                onClick={() => {
                    if(item.submenu) {
                        setSubmenuvisible(!submenuVisible)
                    } else {
                        item.onClick()
                    }
                }}
            >
            <FontAwesomeIcon color="#d7ecef" size="xs" icon={item.icon} />
            {item.label && <span>{item.label}</span>}
            {item.submenu && (
                <FontAwesomeIcon color="#d7ecef" size="xs" icon={direction == "horizontal" ? "caret-down" : "caret-right"} />
            )}
            </button>
            {submenuVisible && 
                <div className="submenu-container">
                    <Menu 
                        items={item.submenu ?? []}
                        onClose={() => setSubmenuvisible(false)}
                    />
                    {/* <ClickOutside
                        onClickOutside={() => setSubmenuvisible(false)}
                    >
                        <Menubar 
                            direction="vertical"
                            size="small"
                            items={item.submenu ?? []}
                        />
                    </ClickOutside> */}
                </div>
            }
            
        </div>
    )

}