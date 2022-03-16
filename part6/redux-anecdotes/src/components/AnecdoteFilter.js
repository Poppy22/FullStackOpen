import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const AnecdoteFilter = ({ setFilter }) => {
  const handleChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = { setFilter }

const ConnectedAnecdoteFilter = connect(() => ({}), mapDispatchToProps)(AnecdoteFilter)
export default ConnectedAnecdoteFilter
