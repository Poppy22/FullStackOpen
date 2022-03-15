import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { vote, create } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  return (
    <div>
      <AnecdoteList anecdotes={anecdotes} dispatch={dispatch} vote={vote} />
      <AnecdoteForm dispatch={dispatch} create={create} />
    </div>
  )
}

export default App
