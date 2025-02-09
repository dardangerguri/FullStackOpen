import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0)
    return (
      <div>No feedback given</div>
    )

  const all = (good + neutral + bad)
  const average = all > 0 ? (good * 1 + bad * -1) / all : 0
  const positive = all > 0 ? (good / all) * 100 : 0

  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={`${positive} %`} />
    </div>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={() => onClick(text)}>
      {text}
    </button>
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
      <Button onClick={handleClick} text='good' />
      <Button onClick={handleClick} text='neutral' />
      <Button onClick={handleClick} text='bad' />

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App