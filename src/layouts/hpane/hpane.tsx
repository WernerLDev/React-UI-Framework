import * as React from 'react'
import './hpane.scss'

export const Hpane = (
    props: {
        children:React.ReactNode,
        overflow?: "auto" | "scroll" | "hidden" | "initial" | "visible"
    }
) => {
    return (
        <div 
            className="hpane"
            style={{
                overflowX: props.overflow ?? "auto"
            }}
        >
            {props.children}    
        </div>
    )
}
