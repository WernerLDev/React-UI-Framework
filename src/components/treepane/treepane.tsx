import * as React from 'react';
import "./treepane.scss";
import { useState } from 'react';
import { SubTree } from './subtree';

export type TreePaneData = {
  key:string,
  label: string | JSX.Element,
  expanded?:boolean,
  children?:TreePaneData[]
}

export type TreePaneProps = {
  data: TreePaneData[],
  onContextMenu?:(key:string, clientX:number, clientY:number) => void,
  onDoubleClick?:(key:string) => void
}

export const TreePane = (props:TreePaneProps) => {
  const [selected, setSelected] = useState('');

  return (
    <div className="treepane">
  
      {props.data.map((tree, _) => (
        <SubTree 
          key={`tree-${tree.key}`} 
          tree={tree} 
          depth={0}
          selected={selected}
          expanded={tree.expanded}
          onSelect={(v) => setSelected(v)}
          onContextMenu={(key, x, y) => {
            if(props.onContextMenu) {
              setSelected(key)
              props.onContextMenu(key, x, y)
            }
          }}
          onDoubleClick={props.onDoubleClick}
        />
      ))}
  
    </div>
  )
};