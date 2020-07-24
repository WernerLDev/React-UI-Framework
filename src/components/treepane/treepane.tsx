import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareRight } from '@fortawesome/free-regular-svg-icons'
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons'
import "./treepane.scss";
import { useState } from 'react';

export type TreePaneData = {
  key:string,
  label: string | JSX.Element,
  expanded?:boolean,
  children?:TreePaneData[]
}


export const TreeRow = (
  props: {
    label:string | JSX.Element, 
    depth:number, 
    expanded:boolean,
    onExpand: (expanded:boolean) => void,
    hasChildren:boolean,
    selected: boolean,
    onClick: () => void,
    onContextMenu?:(clientX:number, clientY:number) => void,
    onDoubleClick?:() => void
  }
) => (
  <div 
    className={`treeitem ${props.selected ? 'selected' : ''}`} 
    style={{paddingLeft: `${props.depth * 15}px`}}
  >

    <div className="caret">
      {props.hasChildren && 
        <button onClick={() => props.onExpand(!props.expanded) }>
        <FontAwesomeIcon color="#212d40ff" icon={props.expanded ? faCaretSquareDown : faCaretSquareRight} />
        </button>
      }
    </div> 
    <div 
      className="label"
      onClick={() => props.onClick()}
      onContextMenu={(e) => {
        if(props.onContextMenu) {
          e.preventDefault();
          props.onContextMenu(e.clientX, e.clientY);
        }
      }}
      onDoubleClick={() => props.onDoubleClick ? props.onDoubleClick() : null}
    >{props.label}</div>

  </div>
)

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