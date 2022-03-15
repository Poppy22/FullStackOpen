import { useDispatch } from 'react-redux'
import { show, hide } from '../reducers/notificationReducer'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createHandler = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(create(content))

    const timeoutId = setTimeout(() => {
      dispatch(hide())
    }, 5000)

    dispatch(show({ timeoutId, content: `You have added a new anecdote: ${content}` }))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createHandler}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
