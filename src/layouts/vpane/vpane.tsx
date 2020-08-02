import * as React from 'react'
import './vpane.scss'

export const Vpane = (
    props: {
        children:React.ReactNode,
        overflow?: "auto" | "scroll" | "hidden" | "initial" | "visible"
    }
) => {
    return (
        <div 
            className="vpane"
            style={{
                overflowY: props.overflow ?? "auto"
            }}
        >
            {props.children}    
        </div>
    )
}
