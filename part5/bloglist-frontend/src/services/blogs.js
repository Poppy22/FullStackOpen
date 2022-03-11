import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = ({ token, title, author, url }) => {
  const request = axios.post(
    baseUrl,
    {
      title,
      author,
      url,
    },
    {
      headers: {
        Authorization: `Basic ${token}`,
      },
    },
  )
  return request.then((response) => response.data)
}

const put = ({ token, id, title, author, url, likes }) => {
  likes++
  const request = axios.put(
    `${baseUrl}/${id}`,
    {
      title,
      author,
      url,
      likes,
    },
    {
      headers: {
        Authorization: `Basic ${token}`,
      },
    },
  )
  return request.then((response) => response.data)
}

const remove = ({ token, id }) => {
  const request = axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  })
  return request.then((response) => response.data)
}

export default { getAll, create, put, remove }
