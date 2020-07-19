import * as React from 'react'
import './pane.scss'

export const Pane = (
    props: {
        children:React.ReactNode
    }
) => {
    return (
        <div className="pane">
            {props.children}    
        </div>
    )
}
