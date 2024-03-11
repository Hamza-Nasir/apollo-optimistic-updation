import { gql, useMutation, useQuery } from '@apollo/client'
import { ClipLoader } from 'react-spinners';
import { TFetchedTodos } from '../../../types/Todo';
import { Todo } from '../../atoms/Todo';
import { MInsertTodo, QGetTodos } from '../../../lib/apollo/queries';
import { useRef } from 'react';
import { RInsertTodo } from '../../../types/mutationResults';

export const TodoList = () => {

    const query = gql(QGetTodos);
    const [insertTodo, { loading: insertTodoLoading }] = useMutation<RInsertTodo, { name: string }>(gql(MInsertTodo), {
        update: (cache, { data }) => {

            const cacheTodos = cache.readQuery<TFetchedTodos>({ query: gql(QGetTodos) });

            if (data && cacheTodos) {
                const newTodosArr = {
                    Todo: [
                        ...cacheTodos.Todo,
                        {
                            __typename: 'Todo',
                            "id": data.insert_Todo_one.id,
                            "name": data.insert_Todo_one.name,
                            "completed": data.insert_Todo_one.completed,
                            "created_at": data.insert_Todo_one.created_at,
                        }
                    ]
                }

                cache.writeQuery({ 
                    query: gql(QGetTodos),
                    data: newTodosArr,
                 })
            }

        }
    });

    const addItemRef = useRef<HTMLInputElement>(null);


    const { loading, error, data } = useQuery<TFetchedTodos>(query);

    return (
        <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
            <div className=" rounded shadow p-6 m-4 w-full max-w-5xl border border-white">
                <div className="mb-4">
                    <h1 className="text-2xl font-extrabold text-grey-darkest">Todo List</h1>
                    <div className="flex mt-4">
                        <input ref={addItemRef} className="shadow appearance-none border rounded w-3/4 py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" />
                                <button
                                    className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-blue-800 flex-1"
                                    onClick={async () => {
                                        if (addItemRef.current && addItemRef.current.value.length > 0) {
                                            await insertTodo({
                                                variables: {
                                                    name: addItemRef.current.value,
                                                },
                                                optimisticResponse: {
                                                    insert_Todo_one: {
                                                        id: data ? data.Todo[data.Todo.length - 1].id + 1 : -1,
                                                        name: addItemRef.current.value,
                                                        completed: false,
                                                        created_at: new Date(),
                                                    }
                                                }
                                            })
                                        }
                                    }}
                                >
                                    Add
                                </button>
                    </div>
                </div>

                {
                    error &&
                    <h2>Error fetching todo's!</h2>
                }

                {
                    (loading) &&
                    <ClipLoader
                        color='white'
                    />
                }

                {
                    data && data.Todo.map((todo) => {
                        return (
                            <div key={todo.id}>
                                <Todo todo={todo} />
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )

}
