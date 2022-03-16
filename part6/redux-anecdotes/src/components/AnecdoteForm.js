import { connect } from 'react-redux'
import { show, hide } from '../reducers/notificationReducer'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ create, show, hide }) => {
  const createHandler = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    create(content)

    const timeoutId = setTimeout(() => {
      hide()
    }, 5000)

    show({ timeoutId, content: `You have added a new anecdote: ${content}` })
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

const mapDispatchToProps = { create, show, hide }

const ConnectedAnecdoteForm = connect(() => ({}), mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
