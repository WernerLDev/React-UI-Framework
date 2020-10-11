import * as React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from './menu';
import { MenuItem } from '../../global/types';

export interface IMenuButtonProps {
    item: MenuItem;
}

export const MenuButton = ({item}:IMenuButtonProps) => {

    const [submenuopen, setSubmenuopen] = useState(false);
    const [timeclosed, setTimeclosed] = useState(0)

    return (
      <>
        {item.kind == "action" ?
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
              className={`${item.submenu && submenuopen ? 'active' : ''}`}
            >
              <span className="icon">
                <FontAwesomeIcon color="#364156ff" size="1x" icon={item.icon} />
              </span>
              {item.label && <span>{item.label}</span>}
              {item.submenu && (
                <FontAwesomeIcon
                  className="caret"
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
        : item.kind == "divider" ?
            <div className="divider">
              <hr />
            </div>
        :  null 
        }
        
      </>
    )
}