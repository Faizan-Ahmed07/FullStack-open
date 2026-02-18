import { useState } from 'react'
const Button =props=>(<button onClick={props.onClick}>{props.text} {props.value}</button>)

const StatisticLine = (props)=>{
  return(
    <tr><td>{props.name} </td><td>{props.value}</td></tr>
  )
}
const Statistics = (props)=>{
  if(props.all()>=1){
  return(
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
      <StatisticLine name={"good"} value={props.good}/>
      <StatisticLine name={"neutral"} value={props.neutral}/>
      <StatisticLine name={"bad"} value={props.bad}/>
      <StatisticLine name={"all"} value={props.all()}/>
      <StatisticLine name={"average"} value={props.average()}/>
      <StatisticLine name={"positive"} value={props.positive()}/>
      </tbody>
      </table>
    
    </div>
  )
}else{
  return(
    <p>No Fedback given</p>
  )
}
}
const App = () => {
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
  const all = ()=>{
    return good + neutral+ bad
  }
  const average = ()=>{
    return ((good*1)+(bad*-1))/all();
  }
  const positive=()=>{
    return good/all();
  }
  return (
    <div>
      <h1>Give FeedBack</h1>
      <Button onClick={incGood} text={"good"}/>
      <Button onClick={incNeutral} text={"neutral"}/>
      <Button onClick={incBad} text={"bad"}/>
      <Statistics good={good} bad ={bad} neutral={neutral} all={all} average={average} positive={positive}/>
       </div>
  )
}

export default App