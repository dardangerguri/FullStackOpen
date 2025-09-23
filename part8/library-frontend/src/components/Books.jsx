import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"


const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const { data, loading, error, refetch } = useQuery(ALL_BOOKS, {
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
        <button onClick={() => { setGenre("refactoring"); refetch({ genre: "refactoring" }) }}>refactoring</button>
        <button onClick={() => { setGenre("agile"); refetch({ genre: "agile" }) }}>agile</button>
        <button onClick={() => { setGenre("patterns"); refetch({ genre: "patterns" }) }}>patterns</button>
        <button onClick={() => { setGenre("design"); refetch({ genre: "design" }) }}>design</button>
        <button onClick={() => { setGenre("crime"); refetch({ genre: "crime" }) }}>crime</button>
        <button onClick={() => { setGenre("classic"); refetch({ genre: "classic" }) }}>classic</button>
        <button onClick={() => { setGenre(null); refetch({ genre: null}) }}>all genres</button>
      </div>
    </div>
  )
}

export default Books
