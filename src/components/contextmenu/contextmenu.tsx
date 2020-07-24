import * as React from 'react';
import { MenubarItem } from '../menubar/menubar';
import { Menu } from '../menubar/menu';

export interface IContextMenuProps {
    items: MenubarItem[],
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