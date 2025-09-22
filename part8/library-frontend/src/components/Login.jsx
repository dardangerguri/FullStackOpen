import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const Login = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
      props.notify('Error logging in: ' + error.graphQLErrors[0].message, true)
    },
    onCompleted: (data) => {
      const token = data.login.value
      props.setToken(token)
      localStorage.setItem("library-user-token", token)
      props.notify('Login successful')
      props.setPage('authors')
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })

    setUsername("")
    setPassword("")
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login
