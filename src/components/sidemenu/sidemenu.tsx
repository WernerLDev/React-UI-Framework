import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useState } from 'react';

import './sidemenu.scss'


export type SideMenuItem = {
  label: string,
  icon: IconProp,
  onClick:() => void,
  className?:string
}

export type Props = {
  items: SideMenuItem[]
}

export const SideMenu = (props:Props) => {

  const [selected, setSelected] = useState(0)


  return (
    <div className="sidePane">
      
      {props.items.map((item, i) => (
        <button 
          key={`sidepane${i}`}
          className={`${item.className} ${i == selected ? "active": ""}`}
          onClick={() => {
            setSelected(i)
            item.onClick();
          }}
        >
          <FontAwesomeIcon color="#d7ecef" icon={item.icon} />
          <span>{item.label}</span>
        </button>
      ))}
      
    </div>
  );
};