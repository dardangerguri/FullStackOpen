import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (feedbackType) => {
    console.log(feedbackType)
    if (feedbackType === 'good')
      setGood(good + 1)
    else if (feedbackType === 'neutral')
      setNeutral(neutral + 1)
    else if (feedbackType === 'bad')
      setBad(bad + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>

      <button onClick={() => handleClick('good')}>good</button>
      <button onClick={() => handleClick('neutral')}>neutral</button>
      <button onClick={() => handleClick('bad')}>bad</button>

      <h2>statistics</h2>
        <p>
          good {good}<br />
          neutral {neutral}<br />
          bad {bad}
        </p>
    </div>
  )
}

export default App