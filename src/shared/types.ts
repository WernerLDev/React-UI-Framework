export type Paginated<T> = {
    page: number,
    totalResultCount: number,
    pageSize: number,
    results: T[]
}