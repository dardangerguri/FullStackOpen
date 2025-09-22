import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"

const Recommends = (props) => {
  const { data: userData, loading: userLoading, error: userError } = useQuery(ME)
  const { data: booksData, loading: booksLoading, error: booksError } = useQuery(ALL_BOOKS)


  if (!props.show) {
    return null
  }

  if (userLoading || booksLoading) {
    return <div>Loading books...</div>
  }

  if (userError) {
    return <div>Error loading user data: {result.error.message}</div>
  }

  if (booksError) {
    return <div>Error loading books: {result.error.message}</div>
  }

  const genre = userData.me.favoriteGenre
  const books = booksData.allBooks
  const filteredBooks = books.filter(b => b.genres.includes(genre))


  return (
    <div>
      <h2>recommendations</h2>

      <div> books in your favorite genre <b>{genre}</b></div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
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

export default Recommends
