import * as React from 'react';

export interface IClickOutsideProps {
    children?: any,
    onClickOutside: () => void
}

export const ClickOutside = (props:IClickOutsideProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {

        const clickHandler = (event: MouseEvent) => {
            if(ref.current && !ref.current.contains(event.target as HTMLElement)) {
                props.onClickOutside();
            }
        }

        document.addEventListener("mousedown", clickHandler)

        return () => document.removeEventListener("mousedown", clickHandler);

    }, [ref])

    return <div ref={ref}>{props.children}</div>
}