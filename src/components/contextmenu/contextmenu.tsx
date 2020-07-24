import * as React from 'react';
import { Menu } from '../menubar/menu';
import { MenuItem } from '../../global/types';

export interface IContextMenuProps {
    items: MenuItem[],
    position: { left: number, top: number },
    onClose: () => void
}

export const ContextMenu = ({items, position, onClose}: IContextMenuProps) => {

    return (
        <div
            style={{
                position: "fixed",
                top: `${position.top}px`,
                left: `${position.left}px`
            }}
        >
            <Menu 
                items={items}
                onClose={onClose}
            />
        </div>
    )
}