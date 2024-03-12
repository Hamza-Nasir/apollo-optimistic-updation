import { gql, useMutation } from "@apollo/client"
import { TFetchedTodos, TTodo } from "../../types/Todo"
import { MCompleteTodo, MDeleteTodo, QGetTodos } from "../../lib/apollo/queries"
import { RCompleteTodo, RDeleteTodo } from "../../types/mutationResults"

export const Todo = ({ todo }: { todo: TTodo }) => {

    // Add optimistic updation to complete todo!
    const [completeTodo] = useMutation<RCompleteTodo, { id: number }>(gql(MCompleteTodo))

    const [deleteTodo] = useMutation<RDeleteTodo, { id: number }>(gql(MDeleteTodo), {
        update: (cache, { data }) => {
            if (data) {

                // This removes the item as from the cache as soon as the query is done
                cache.evict({
                    id: cache.identify({
                        __typename: "Todo",
                        id: data.delete_Todo_by_pk.id,
                    }),
                })

                // After evicting from the cache,
                // also re-write the query cache
                const todos = cache.readQuery<TFetchedTodos>({
                    query: gql(QGetTodos),
                })

                if (todos) {
                    const updatedArray = {
                        Todo: todos.Todo.filter((todo) => todo.id !== data.delete_Todo_by_pk.id)
                    }

                    cache.writeQuery({
                        query: gql(QGetTodos),
                        data: updatedArray,
                    })
                }
            }
        }
    })

    return (
            <div className="flex mb-4 items-center gap-4">
                <p className={`w-3/4 p-4 text-left ${todo.completed ? "bg-green-950 rounded-lg" : ""}`}>{todo.name}</p>
                { 
                    !todo.completed && 
                    <button 
                        className="flex-no-shrink flex-1 p-2  border-2 rounded text-red border-red hover:text-white hover:bg-green-800"
                        onClick={() => {
                            completeTodo({
                                variables: {
                                    id: todo.id,
                                }
                            })
                        
                        }}
                    >
                        Complete
                    </button>
                }
                <button 
                    className="flex-no-shrink flex-1 p-2  border-2 rounded text-red border-red hover:text-white hover:bg-red-800"
                    onClick={async () => {
                        await deleteTodo({
                            variables: {
                                id: todo.id,
                            },
                            optimisticResponse: {
                                delete_Todo_by_pk: {
                                    id: todo.id,
                                    name: todo.name,
                                }
                            }
                        })
                    }}
                >
                    Remove
                    </button>
            </div>

    )
}
