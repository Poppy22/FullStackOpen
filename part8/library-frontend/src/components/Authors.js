import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from '../queries'
import AuthorBirthYear from './AuthorBirthYear'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  return result.loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <AuthorBirthYear authors={result.data.allAuthors} />
    </div>
  )
}

export default Authors
