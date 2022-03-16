import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (x) => {
  const response = await axios.post(baseUrl, x)
  return response.data
}

const update = async (x) => {
  const response = await axios.put(`${baseUrl}/${x.id}`, x)
  return response.data
}

export default { getAll, create, update }
