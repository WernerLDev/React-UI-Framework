import * as React from 'react';
import { useState } from 'react';
import { TreePaneData } from './treepane';
import { TreeRow } from './treerow';


export const SubTree = (
    props:{
      tree:TreePaneData,
      depth:number,
      selected: string,
      expanded?:boolean,
      onSelect: (key:string) => void,
      onContextMenu?:(key:string, clientX:number, clientY:number) => void,
      onDoubleClick?:(key:string) => void
    }
  ) => {
    const [expanded, setExpanded] = useState(props.expanded != null ? props.expanded : true);
  
    return (
      <>
        <TreeRow 
          label={props.tree.label} 
          depth={props.depth} 
          hasChildren={props.tree.children != null} 
          expanded={expanded} 
          onExpand={v => setExpanded(v)}
          selected={props.selected === props.tree.key}
          onClick={() => props.onSelect(props.tree.key)}
          onContextMenu={(x,y) => {
            if(props.onContextMenu) {
              console.log("Inside subtree")
            }
            props.onContextMenu ? props.onContextMenu(props.tree.key, x, y) : null
          }}
          onDoubleClick={() => props.onDoubleClick ? props.onDoubleClick(props.tree.key) : null}
        />
        {props.tree.children ?
          <div style={{display: expanded ? "block" : "none"}}>
            {props.tree.children.map((childTree, index) => (
              <SubTree 
                key={`tree-${childTree.key}`} 
                tree={childTree} depth={props.depth + 1}
                selected={props.selected}
                expanded={childTree.expanded}
                onSelect={(v) => props.onSelect(v)}
                onContextMenu={props.onContextMenu}
                onDoubleClick={props.onDoubleClick}
              />
            ))}
          </div>
        : null }
      </>
    )
  }