import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"


const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const { data, loading, error } = useQuery(ALL_BOOKS, {
    variables: { genre: genre === "all" ? null : genre },
  })

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>Loading books...</div>
  }

  if (error) {
    return <div>Error loading books: {error.message}</div>
  }

  const books = data.allBooks

  return (
    <div>
      <h2>books</h2>

      <div> in genre <b>{genre || "all"}</b></div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenre("refactoring")}>refactoring</button>
        <button onClick={() => setGenre("agile")}>agile</button>
        <button onClick={() => setGenre("patterns")}>patterns</button>
        <button onClick={() => setGenre("design")}>design</button>
        <button onClick={() => setGenre("crime")}>crime</button>
        <button onClick={() => setGenre("classic")}>classic</button>
        <button onClick={() => setGenre("all")}>all genres</button>
      </div>
    </div>
  )
}

export default Books
