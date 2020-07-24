import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type Paginated<T> = {
    page: number,
    totalResultCount: number,
    pageSize: number,
    results: T[]
}

export type MenuItem = {
    kind: "action";
    icon: IconProp;
    label?: string;
    disabled?: boolean;
    submenu?: MenuItem[];
    onClick: () => void;
  } | {
      kind: "divider"
  } | {
      kind: "element";
      element: JSX.Element;
  };