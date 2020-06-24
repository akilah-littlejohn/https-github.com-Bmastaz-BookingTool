export interface Books {
    date?: string;
    name?: string;
    service?: string;
    time?: string;
}

export interface IDictionary<T> {
    [index:string]: Books;
}