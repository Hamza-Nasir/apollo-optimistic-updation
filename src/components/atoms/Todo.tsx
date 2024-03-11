import { gql, useMutation } from "@apollo/client"
import { TTodo } from "../../types/Todo"
import { MCompleteTodo, MDeleteTodo } from "../../lib/apollo/queries"
import { RCompleteTodo, RDeleteTodo } from "../../types/mutationResults"

export const Todo = ({ todo }: { todo: TTodo }) => {

    const [deleteTodo] = useMutation<RDeleteTodo, { id: number }>(gql(MDeleteTodo))
    const [completeTodo] = useMutation<RCompleteTodo, { id: number }>(gql(MCompleteTodo))

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
                            }
                        })
                    }}
                >
                    Remove
                    </button>
            </div>

    )
}
