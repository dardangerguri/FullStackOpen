import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  const all = (good + neutral + bad)
  const average = all > 0 ? (good * 1 + bad * -1) / all : 0
  const positive = all > 0 ? (good / all) * 100 : 0

  return (
    <div>
      <p>
        good {good} <br />
        neutral {neutral} <br />
        bad {bad} <br />
        all {all} <br />
        average {average} <br />
        positive {positive}%
      </p>
    </div>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App