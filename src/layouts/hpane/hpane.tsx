import * as React from 'react'
import './hpane.scss'

export const Hpane = (
    props: {
        children:React.ReactNode
    }
) => {
    return (
        <div className="hpane">
            {props.children}    
        </div>
    )
}
