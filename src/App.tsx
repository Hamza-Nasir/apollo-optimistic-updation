import './App.css'
import { ApolloProvider } from '@apollo/client'

import { client } from './lib/apollo'
import { TodoList } from './components/molecules/Todo/TodoList'


function App() {

  return (
    <ApolloProvider client={client}>
      <TodoList />
    </ApolloProvider>
  )
}

export default App
