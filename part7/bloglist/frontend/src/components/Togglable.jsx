import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div className="mb-4">
      {!visible && (
        <div className="text-center">
          <button onClick={toggleVisibility} className="btn btn-success btn-lg">
            {props.buttonLabel}
          </button>
        </div>
      )}
      {visible && (
        <div>
          {props.children}
          <div className="text-center mt-3">
            <button
              onClick={toggleVisibility}
              className="btn btn-outline-secondary"
            >
              cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
