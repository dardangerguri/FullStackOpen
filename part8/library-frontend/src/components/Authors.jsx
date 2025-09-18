import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)

  const [ editBirthyear ] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading authors...</div>
  }

  if (result.error) {
    return <div>Error loading authors: {result.error.message}</div>
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    console.log('update author...')

    const bornInt = Number(born)
    if (isNaN(bornInt) || born.trim() === '') {
      console.log('Born year must be a number')
      return
    }

    const currentYear = new Date().getFullYear()
    if (bornInt < 0 || bornInt > currentYear) {
      console.log(`Born year must be between 0 and ${currentYear}`)
      return
    }

    editBirthyear({ variables: { name, setBornTo: bornInt } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
            required style={{
              width: "100%",
              display: "inline-block",
              marginRight: "10px",
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              backgroundColor: "white",
              fontSize: "14px",
            }}>
          <option value="" disabled> choose author </option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born <input value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
