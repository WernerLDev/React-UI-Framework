import * as React from 'react';
import { MenubarItem } from './menubar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                onClick={() => item.onClick()}
                >
            <FontAwesomeIcon color="#d7ecef" size="xs" icon={item.icon} />
            {item.label && <span>{item.label}</span>}
            </button>
            {item.submenu && (
                <>
                <button 
                    className={`menubar-submenu-btn ${size}`}
                    onClick={(e) => setSubmenuvisible(!submenuVisible)}
                >
                    <FontAwesomeIcon color="#d7ecef" size="xs" icon="caret-down" />
                </button>

                {submenuVisible && 
                    <div className="submenu-container"></div>
                }
                </>
            )}
            
        </div>
    )

}