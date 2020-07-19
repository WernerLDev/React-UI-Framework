import * as React from 'react'
import './vpane.scss'

export const Vpane = (
    props: {
        children:React.ReactNode
    }
) => {
    return (
        <div className="vpane">
            {props.children}    
        </div>
    )
}
