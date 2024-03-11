export type TTodo = {
    id: number;
    name: string;
    completed: boolean;
    created_at: Date;
}

export type TFetchedTodos = {
    Todo: Array<TTodo>;
}