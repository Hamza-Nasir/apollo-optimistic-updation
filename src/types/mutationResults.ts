export type RInsertTodo = {
    insert_Todo_one: {
        id: number;
        name: string;
        completed: boolean;
        created_at: Date;

    }
}

export type RDeleteTodo = {
    delete_Todo_by_pk: {
        name: string;
    }
}

export type RCompleteTodo = {
    update_Todo_by_pk: {
        id: number;
        completed: boolean;
    }
}