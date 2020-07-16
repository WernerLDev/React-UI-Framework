import * as React from 'react';
import './splitpane.scss';

export interface SplitPaneProps {
  direction: "horizontal" | "vertical",
  initialSize?:number,
  children:JSX.Element[]
}

export interface SplitPaneState {
  size: number;
}

export class SplitPane extends React.Component<SplitPaneProps, SplitPaneState> {

  constructor(props:SplitPaneProps) {
    super(props);
    this.state = { size: props.initialSize != null ? props.initialSize : 500 }

    if(props.children && props.children.length != 2) {
      throw Error(`Splitpane requires 2 child nodes, ${props.children.length} given`)
    }
  }

  container:HTMLDivElement | null = null;

  onMouseDown = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(this.container != null) {
      this.container.addEventListener("mousemove", this.onMouseMove)
      this.container.addEventListener("mouseup", this.onMouseUp);
      this.container.classList.add(`splitpane-${this.props.direction}-dragging`);
    }
  }

  onMouseUp = (e:MouseEvent) => {
    if(this.container != null) {
      this.container.removeEventListener("mousemove", this.onMouseMove)
      this.container.removeEventListener("mouseup", this.onMouseUp);
      this.container.classList.remove(`splitpane-${this.props.direction}-dragging`);
    }
  }

  onMouseMove = (e:MouseEvent) => {
    if(e.currentTarget != null) {
      const target = e.currentTarget as HTMLDivElement;
      const rect = target.getBoundingClientRect();
      let newSize = e.clientX - rect.left;
      if(this.props.direction == "vertical") {
        newSize = e.clientY - rect.top;
      }
      this.setState({...this.state, size: newSize});
    }
  }

  getStyle():React.CSSProperties {
    if(this.props.direction == "horizontal") {
      return {
        width: `${this.state.size}px`,
        height: 'initial'
      }
    } else {
      return {
        height: `${this.state.size}px`,
        width: 'initial'
      }
    }
  }

  public render() {
    return (
      <div 
        ref={(ref) => this.container = ref} 
        className="splitpane-container"
        style={{flexDirection: this.props.direction == "horizontal" ? "row" : "column"}}
      >
        <div style={this.getStyle()} className="splitpane-pane1">
          {this.props.children[0]}
        </div>
        <div 
          onMouseDown={this.onMouseDown}
          className={`splitpane-handle-${this.props.direction}`}
        ></div>
        <div className="splitpane-pane2">
          {this.props.children[1]}
        </div>
      </div>
    );
  }
}
