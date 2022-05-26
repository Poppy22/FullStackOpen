import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState('Any')

  useEffect(() => {
    if (result.data?.allBooks) {
      const g = [...new Set(result.data.allBooks.map((e) => e.genres).flat())].sort()
      setGenres(g)
      setGenre('Any')
    }
  }, [result.data]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  return result.loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h2>books</h2>
      <p> Filter books by their genre:</p>
      <select value={genre} onChange={({ target }) => setGenre(target.value)}>
        <option>Any</option>
        {genres.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
            <th>Genres</th>
          </tr>
          {result.data.allBooks
            .filter((b) => genre === 'Any' || b.genres.includes(genre))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
                <td> {a.genres.toString()} </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
