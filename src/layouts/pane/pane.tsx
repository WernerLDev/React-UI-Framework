import * as React from 'react'

export const Pane = (
    props: {
        width?: number,
        height?: number,
        background?: string,
        overflow?: "auto" | "scroll" | "hidden" | "initial",
        padding?:number,
        className?: string,
        children:React.ReactNode
    }
) => {
    const background = 
        props.background && props.background != "none" ? props.background
        : props.background && props.background == "none" ? undefined
        : "#DBE0E9"

    const style: React.CSSProperties = {
        width: props.width ? `${props.width}px` : undefined,
        height: props.height ? `${props.height}px` : undefined,
        minWidth: props.width ? `${props.width}px` : undefined,
        minHeight: props.height ? `${props.height}px` : undefined,
        flexGrow: props.width == null && props.height == null ? 1 : undefined,
        alignSelf: props.width == null && props.height == null ? 'stretch' : undefined,
        background: background,
        borderBottom: props.height ? "1px solid #C6CDDB" : undefined,
        borderRight: props.width ? "1px solid #C6CDDB" : undefined,
        overflow: props.overflow ?? "hidden",
        padding: props.padding ? `${props.padding}.px` : undefined
    }
    return (
        <div style={style} className={`pane ${props.className ?? ''}`}>
            {props.children}    
        </div>
    )
}

