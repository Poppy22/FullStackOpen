import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createReducer(state, action) {
      const content = action.payload
      state.push(content)
    },
    voteReducer(state, action) {
      const content = action.payload
      return state.map((e) => (e.id === content.id ? { ...e, votes: e.votes + 1 } : e))
    },
    initializeReducer(state, action) {
      return action.payload
    },
  },
})

export const { createReducer, voteReducer, initializeReducer } = anecdoteSlice.actions

export const vote = (anecdote) => async (dispatch) => {
  const updatedAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
  dispatch(voteReducer(updatedAnecdote))
}

export const create = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.create({ content, votes: 0 })
  dispatch(createReducer(newAnecdote))
}

export const initialize = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(initializeReducer(anecdotes))
}

export default anecdoteSlice.reducer
