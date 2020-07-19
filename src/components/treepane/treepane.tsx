import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareRight } from '@fortawesome/free-regular-svg-icons'
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons'
import "./treepane.scss";
import { useState } from 'react';

export type TreePaneData = {
  key:string,
  label: string | JSX.Element,
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
    onClick: () => void
  }
) => (
  <div 
    className={`treeitem ${props.selected ? 'selected' : ''}`} 
    style={{paddingLeft: `${props.depth * 15}px`}}
  >

    <div className="caret">
      {props.hasChildren && 
        <button onClick={() => props.onExpand(!props.expanded) }>
        <FontAwesomeIcon color="#a9a9a9" icon={props.expanded ? faCaretSquareDown : faCaretSquareRight} />
        </button>
      }
    </div> 
    <div 
      className="label"
      onClick={() => props.onClick()}
    >{props.label}</div>

  </div>
)

export const SubTree = (
  props:{
    tree:TreePaneData,
    depth:number,
    selected: string,
    onSelect: (key:string) => void
  }
) => {
  const [expanded, setExpanded] = useState(true);

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
      />
      {props.tree.children ?
        <div style={{display: expanded ? "block" : "none"}}>
          {props.tree.children.map((childTree, index) => (
            <SubTree 
              key={`tree-${childTree.key}`} 
              tree={childTree} depth={props.depth + 1}
              selected={props.selected}
              onSelect={(v) => props.onSelect(v)}
            />
          ))}
        </div>
      : null }
    </>
  )
}

export const TreePane = (props:{data:TreePaneData[]}) => {
  const [selected, setSelected] = useState('Test2');

  return (
    <div className="treepane">
  
      {props.data.map((tree, index) => (
        <SubTree 
          key={`tree-${tree.key}`} 
          tree={tree} depth={0}
          selected={selected}
          onSelect={(v) => setSelected(v)}
        />
      ))}
  
    </div>
  )
};