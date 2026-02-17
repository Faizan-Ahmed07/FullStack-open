import { useState } from 'react'
const Button =props=>(<button onClick={props.onClick}>{props.text} {props.value}</button>)
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const incGood = ()=>{
    const increasedGood = good +1;
    setGood(increasedGood);
  }
  const incNeutral =()=>{
    const increasedNeutral = neutral+1
    setNeutral(increasedNeutral)
  }
  const incBad = ()=>{
    const increasedBad = bad+1;
    setBad(increasedBad);
  }
  return (
    <div>
      <h1>Give FeedBack</h1>
      <Button onClick={incGood} text={"good"}/>
      <Button onClick={incNeutral} text={"neutral"}/>
      <Button onClick={incBad} text={"bad"}/>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
       </div>
  )
}

export default App