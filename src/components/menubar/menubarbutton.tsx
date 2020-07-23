import * as React from 'react';
import { MenubarItem, Menubar } from './menubar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClickOutside } from '../../layouts/clickoutside/clickoutside';

export interface IMenuBarButtonProps {
    size: "small" | "big",
    item: MenubarItem
}

export const MenuBarButton = ( {size, item}: IMenuBarButtonProps ) => {
    
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
                <FontAwesomeIcon color="#d7ecef" size="xs" icon="caret-down" />
            )}
            </button>
            {submenuVisible && 
                <div className="submenu-container">
                    <ClickOutside
                        onClickOutside={() => setSubmenuvisible(false)}
                    >
                        <Menubar 
                            direction="vertical"
                            size="small"
                            items={item.submenu ?? []}
                        />
                    </ClickOutside>
                </div>
            }
            
        </div>
    )

}