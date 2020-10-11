import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareRight } from '@fortawesome/free-regular-svg-icons'
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons'
import * as React from 'react';

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