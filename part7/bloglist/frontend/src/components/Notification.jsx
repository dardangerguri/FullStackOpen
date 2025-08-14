import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (notification === null) return null

  const alertClass =
    notification.type === 'error' ? 'alert alert-danger' : 'alert alert-success'

  return (
    <div className={`${alertClass} alert-dismissible fade show`} role="alert">
      {notification.message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  )
}

export default Notification
