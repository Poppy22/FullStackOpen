import { useSelector, useDispatch } from 'react-redux'
import { show, hide } from '../reducers/notificationReducer'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  const voteHandler = (anecdote) => {
    dispatch(vote(anecdote))
    const timeoutId = setTimeout(() => {
      dispatch(hide())
    }, 5000)

    dispatch(show({ timeoutId, content: `You vote for anecdote: ${anecdote.content}` }))
  }

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes
        .filter((e) => e.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voteHandler(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
