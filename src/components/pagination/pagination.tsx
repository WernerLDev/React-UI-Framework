import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./pagination.scss"
import { Menubar } from '../menubar/menubar';


export interface IPaginationProps {
  page: number,
  totalPages: number,
  pageSize: number,
  onPageChange: (_:number) => void,
  onPageSizeChange: (_:number) => void
}

export const Pagination = (props:IPaginationProps) => (
  <div className="pagination-container">
    <Menubar 
      direction="horizontal"
      size="small"
      items={[
        {
          kind: "action",
          icon: "angle-double-left",
          onClick: () => props.onPageChange(0)
        },
        {
          kind: "action",
          icon: "angle-left",
          onClick: () => {
            if(props.page > 0) {
              props.onPageChange(props.page - 1)
            }
          }
        },
        {
          kind: "element",
          element: <>
            <span>Page</span> 
            <input 
              type="text" 
              value={props.page + 1}
              onChange={(e) => {
                console.log(e.currentTarget.value)
                const val = parseInt(e.currentTarget.value)
                if(e.currentTarget.value.length > 0 && val !== NaN) {
                  props.onPageChange(val - 1)
                } else {
                  props.onPageChange(0)
                }
              }}
            />
            <span>of {props.totalPages}</span>
          </>
        },
        {
          kind: "action",
          icon: "angle-right",
          onClick: () => {
            if(props.page + 1 < props.totalPages) {
              props.onPageChange(props.page + 1)
            }
          }
        },
        {
          kind: "action",
          icon: "angle-double-right",
          onClick: () => props.onPageChange(props.totalPages - 1)
        },
        {
          kind: "divider"
        },
        {
          kind: "element",
          element: <>
            <select 
              value={props.pageSize}
              onChange={(e) => {
                props.onPageSizeChange(parseInt(e.currentTarget.value))
              }}
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span>Per page</span>
          </>
        }
      ]}
    />
  </div>
)


/*
<div className="pagination-container">
    <div className="pagination">
      <a 
        className="pagination--button" 
        href="#"
        onClick={(e) => {
          e.preventDefault();
          props.onPageChange(0)
        }}
      >
        <FontAwesomeIcon icon="angle-double-left" />
      </a>
      <a 
        className="pagination--button" 
        href="#"
        onClick={(e) => {
          e.preventDefault();
          if(props.page > 0) {
            props.onPageChange(props.page - 1)
          }
        }}
      >
        <FontAwesomeIcon icon="angle-left" />
      </a>

      <span>Page</span> 
      <input 
        type="text" 
        value={props.page + 1}
        onChange={(e) => {
          console.log(e.currentTarget.value)
          const val = parseInt(e.currentTarget.value)
          if(e.currentTarget.value.length > 0 && val !== NaN) {
            props.onPageChange(val - 1)
          } else {
            props.onPageChange(0)
          }
        }}
        // onKeyDown={(e) => {
        //   e.preventDefault();
        // }}
      />
      <span>of {props.totalPages}</span>

      <a 
        className="pagination--button" 
        href="#"
        onClick={(e) => {
          e.preventDefault();
          if(props.page + 1 < props.totalPages) {
            props.onPageChange(props.page + 1)
          }
        }}
      >
        <FontAwesomeIcon icon="angle-right" />
      </a>
      <a 
        className="pagination--button" 
        href="#"
        onClick={(e) => {
          e.preventDefault();
          props.onPageChange(props.totalPages - 1)
        }}
      >
        <FontAwesomeIcon icon="angle-double-right" />
      </a>
    </div>
    <div className="divider"></div>
    <div className="perpage">
      <select 
        value={props.pageSize}
        onChange={(e) => {
          props.onPageSizeChange(parseInt(e.currentTarget.value))
        }}
      >
        <option>10</option>
        <option>25</option>
        <option>50</option>
        <option>100</option>
      </select>
      <span>Per page</span>
    </div>
  </div>
*/