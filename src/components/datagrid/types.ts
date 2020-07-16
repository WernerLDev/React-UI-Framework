export type DataSort<T> = {
    direction: "asc" | "desc",
    column: keyof T
}

export type DatagridParameters<T> = {
    sort: DataSort<T>,
    page: number,
    pageSize: number
}