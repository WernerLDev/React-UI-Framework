import * as React from 'react';
import { Menu } from '../menubar/menu';
import { MenuItem } from '../../global/types';

export interface IContextMenuProps {
    items: MenuItem[],
    position: { left: number, top: number },
    onClose: () => void
}

export const ContextMenu = ({items, position, onClose}: IContextMenuProps) => {

    const offsetHeight = document.body.offsetHeight;
    const offsetWidth = document.body.offsetWidth;
    const isAtBottom = position.top > offsetHeight / 2;
    const isAtRight = offsetWidth - position.left < 300;

    return (
        <div
            style={{
                position: "fixed",
                top: isAtBottom ? undefined : `${position.top}px`,
                left: isAtRight ? undefined : `${position.left}px`,
                bottom: isAtBottom ? `${offsetHeight - position.top}px` : undefined,
                right: isAtRight ? `${offsetWidth - position.left}px` : undefined,
            }}
        >
            <Menu 
                items={items}
                onClose={onClose}
            />
        </div>
    )
}