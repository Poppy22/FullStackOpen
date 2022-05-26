import { useApolloClient, useQuery, useLazyQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { ALL_BOOKS, GET_USER } from '../queries'

const BookRecommendation = (props) => {
  const user = useQuery(GET_USER)
  const [books, setBooks] = useState([])
  const [getBooks, { data: booksData }] = useLazyQuery(ALL_BOOKS)
  const client = useApolloClient()

  useEffect(() => {
    if (!user.data?.me?.favouriteGenre) return

    // graphql solution to filtering
    getBooks({ variables: { genre: user.data.me.favouriteGenre } })
  }, [user.data]) // eslint-disable-line

  useEffect(() => {
    if (booksData) setBooks(booksData.allBooks)
  }, [booksData]) // eslint-disable-line

  useEffect(() => {
    const getUserPreferences = async () => {
      await client.refetchQueries({
        include: [GET_USER],
      })
    }
    getUserPreferences()
  }, [props.token])

  if (!props.show) {
    return null
  }

  return user.loading || !user.data.me ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h2>recommendations for genre {user.data.me.favouriteGenre} </h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((b) => b.genres.includes(user.data.me.favouriteGenre))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookRecommendation
