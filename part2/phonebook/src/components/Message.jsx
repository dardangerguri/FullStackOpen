const Message = ({message, isError}) => {
  if (message === null)
    return null

  return (
    <div
      className="messageStyle"
      style={{"--message-color": isError ? "red" : "green"}}
    >
      {message}
    </div>
  )
}

export default Message
