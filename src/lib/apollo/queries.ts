export const QGetTodos = `
  query GetTodos {
    Todo(order_by: {id: asc}) {
      id
      name
      completed
      created_at
    }
  }
`

export const MInsertTodo = `
    mutation InsertTodo($name: String!) {
        insert_Todo_one(object: {name: $name}) {
            id
            name
            completed
            created_at
        }
    }
  
`

export const MDeleteTodo = `
    mutation DeleteTodo($id: Int!) {
        delete_Todo_by_pk(id: $id) {
            id
            name
        }
    }
`

export const MCompleteTodo = `
    mutation SetTodoCompletion($id: Int!) {
        update_Todo_by_pk(pk_columns: {id: $id}, _set: {completed: true}) {
            id
            completed
        }
    }
  
`