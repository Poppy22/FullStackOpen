import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const AuthorBirthYear = ({ authors }) => {
  const [name, setName] = useState(authors[0]?.name ?? '')
  const [year, setYear] = useState(0)

  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name, setBornTo: Number(year) } })
    setYear(0)
  }

  return (
    <div>
      <h3>Update author birthyear</h3>
      <form onSubmit={submit}>
        name
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map((a) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          born <input type="number" value={year} onChange={({ target }) => setYear(target.value)} />
        </div>
        <button type="submit">Update author birthyear</button>
      </form>
    </div>
  )
}

export default AuthorBirthYear
