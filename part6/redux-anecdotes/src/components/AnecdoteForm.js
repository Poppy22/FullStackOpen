const AnecdoteForm = ({ dispatch, create }) => {
  const createHandler = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(create(content))
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
