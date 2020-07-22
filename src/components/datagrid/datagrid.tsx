import * as React from 'react';
import "./datagrid.scss"
import { List } from 'immutable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataSort } from './types';


export type DataColumn<T> = {
  title: string,
  identifier?: keyof T,
  width: number | "auto" | "fixed",
  sortable? :boolean,
  filterable?: boolean,
  resizable?: boolean,
  render: (_:T, index: number) => JSX.Element
}

export interface IDataGridProps<T> {
  data: T[],
  sort: DataSort<T>,
  onSort: (_:DataSort<T>) => void,
  selectedRow: number,
  columns: DataColumn<T>[],
  footer?:JSX.Element
}

export interface IDataGridState {
  widths: List<number | "auto" | "fixed">,
  colResizing: number | "none"
}

export class DataGrid<T> extends React.Component<IDataGridProps<T>, IDataGridState> {

  container:HTMLDivElement | null = null;
  tblheader:HTMLDivElement | null = null;

  constructor(props:IDataGridProps<T>) {
    super(props)
    this.state = {
      widths: List(props.columns.map(x => x.width)),
      colResizing: "none"
    }
  }

  currentTime = Date.now();

  onMouseDown = (index:number) => {
    this.setState({...this.state, colResizing: index}, () => {
      if(this.container != null) {
        this.currentTime = Date.now();
        this.container.addEventListener("mousemove", this.onMouseMove)
        this.container.addEventListener("mouseup", this.onMouseUp);
        this.container.classList.add(`datagrid--resizing`);
      }
    })
  }

  onMouseMove = (e:MouseEvent) => {
    if(Date.now() - this.currentTime <= 16) return
    if(e.currentTarget != null && this.state.colResizing != "none" && this.container != null) {
      const rect = this.container.getBoundingClientRect();
      const prewidth = this.state.widths
        .slice(0,this.state.colResizing)
        .reduce((a,b) => {
          if(b == "auto") return a;
          if(b == "fixed") return a + 40;
          return a + b;
        }, 0)

      let newSize = e.clientX - rect.left;
      newSize -= prewidth
      if(newSize < 70) newSize = 70;
      this.setState({
        ...this.state, 
        widths: this.state.widths.set(this.state.colResizing, newSize)
      })
      this.currentTime = Date.now();
    }
  }

  onMouseUp = (_:MouseEvent) => {
    if(this.container != null) {
      this.container.removeEventListener("mousemove", this.onMouseMove)
      this.container.removeEventListener("mouseup", this.onMouseUp);
      this.container.classList.remove(`datagrid--resizing`);
      this.setState({...this.state, colResizing: "none"});
    }
  }

  onScroll = (e:React.UIEvent<HTMLDivElement, UIEvent>) => {
    if(this.tblheader != null)
      this.tblheader.scrollLeft = e.currentTarget.scrollLeft
  }

  renderSort(column:DataColumn<T>) {
    const { sort } = this.props;
    return (
      <>
        {sort.column == column.identifier ?
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              this.props.onSort({
                ...sort,
                direction: sort.direction == "asc" ? "desc" : "asc"
              })
            }}
          >
            <FontAwesomeIcon 
              icon={sort.direction == "asc" ? "sort-down" : "sort-up"}
              style={{paddingLeft: '5px'}}
            />
          </a>
        :
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if(column.identifier) {
                this.props.onSort({
                  direction: "asc",
                  column: column.identifier
                })
              }
            }}
          >
            <FontAwesomeIcon
              icon="sort"
              color="gray"
              style={{paddingLeft: '5px'}}
            />
          </a>
        }
      </>
    )
  }

  public render() {
    const {columns, data, selectedRow} = this.props;

    return (
      <div ref={(ref) => this.container = ref} className="datagrid">
        <div ref={(ref) => this.tblheader = ref} className="datagrid--header">
          {columns.map((column, index) => {
            let width = this.state.widths.get(index)
            
            return (
              <div 
                key={`datagridhead-${index}`}
                id={`datagridhead-${index}`}
                style={{
                  width: width == "auto" ? "auto" : `${width}px`,
                  minWidth: width == "auto" ? "150px" : `${width}px`,
                  flexGrow: width == "auto" ? 1 : undefined
                }}
                className={`datagrid--cell ${column.width == "fixed" ? "datagrid--left" : ""}`}
              >
                {column.title}
                {column.sortable &&
                  this.renderSort(column)
                }

                {column.filterable &&
                  <FontAwesomeIcon
                    icon="filter"
                    size="sm"
                    color="gray"
                    style={{position: "absolute", top: "14px", right: "10px"}}
                  />
                }
               
                {width != "auto" && width != "fixed" && column.filterable != false &&
                  <div 
                    className="datagrid--resizer"
                    style={{right: `-1px`}}
                    onMouseDown={(e) => this.onMouseDown(index)}
                  >
                  </div>
                }
              </div>
            )
          })}
        </div>

        <div 
          onScroll={this.onScroll}
          className="datagrid--body"
        >
          {columns.map((col, colindex) => {
            let width = this.state.widths.get(colindex)

            return (
              <div 
                key={`col${colindex}`}
                className="datagrid--column"
                style={{
                  width: width == "auto" ? "auto" : `${width}px`, 
                  minWidth: width == "auto" ? undefined : `${width}px`,
                  flexGrow: width == "auto" ? 1 : undefined
                }}
              >
                {data.map((row, rowindex) => (
                  <div 
                    key={`row${rowindex}`}
                    className={`
                      datagrid--cell
                      ${col.width == "fixed" ? "datagrid--left" : ""}
                      ${selectedRow == rowindex ? "datagrid--row-selected" : ""}
                    `}>
                      {col.render(row, rowindex)}
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        {this.props.footer && 
          <div className="datagrid--footer">
            {this.props.footer}
          </div>
        }
      </div>
    );
  }
}
