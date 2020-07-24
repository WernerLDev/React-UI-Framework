import * as React from 'react';
import { MenubarItem } from './menubar';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from './menu';

export interface IMenuButtonProps {
    item: MenubarItem;
}

export const MenuButton = ({item}:IMenuButtonProps) => {

    const [submenuopen, setSubmenuopen] = useState(false);
    const [timeclosed, setTimeclosed] = useState(0)

    return (
        <div className="button-container">
            <button
              onClick={() => {
                if(item.submenu) {
                    if(Date.now() - timeclosed > 300) {
                        setSubmenuopen(!submenuopen)
                    }
                }
                else item.onClick()
              }}
            >
              <span className="icon">
                <FontAwesomeIcon color="#57b7d1" size="1x" icon={item.icon} />
              </span>
              {item.label && <span>{item.label}</span>}
              {item.submenu && (
                <FontAwesomeIcon
                  color="#a9a9a9"
                  size="xs"
                  icon="caret-right"
                />
              )}
            </button>
            {item.submenu && submenuopen && 
              <div className="submenu">
                <Menu 
                  items={item.submenu}
                  onClose={() => {
                    setTimeclosed(Date.now())
                    setSubmenuopen(false)
                  }}
                />
              </div>
            }
        </div>
    )
}