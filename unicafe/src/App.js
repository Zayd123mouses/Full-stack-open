import { useState } from 'react'


const Button = (props) => 
(  
  <button onClick={props.onClick}>
    {props.text}
  </button>
)



const Statistics = ({state,all}) => {
 if(all === 0){
      return (
    <>
      <h1>Statistics</h1>
       <div>No feedback was given</div>
    </>
    )
 }


return (
  <>
<h1>Statistics</h1>
 <table>
  <tbody>
    <StatisticLine text={state.good.name} value={state.good.value}/>
    <StatisticLine text={state.bad.name} value={state.bad.value}/>
    <StatisticLine text={state.neutral.name} value={state.neutral.value}/>
    <StatisticLine text='All' value={all}/>
    <StatisticLine text='Average' value={(all/3).toFixed(3)}/>
    <StatisticLine text='Positive' value={state.good.value/all * 100 + ' %'}/>
  </tbody>
 </table>
</>
)


}




const StatisticLine = (props) => 
    (     
         <tr>
             <td>{props.text}</td>
             <td>{props.value}</td>
        </tr>
                                     )
const Display = ({text}) => <h1>{text}</h1>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const update = (newvalue, type) => () => {
    console.log('why',type)

    if(type === 'good')
    {
          setGood(newvalue)
    } else if (type === 'bad'){
          setBad(newvalue)
    } else {
          setNeutral(newvalue)
    }
     
  } 

  
const object = {

    good: {
        name: "good",
        value: good
            },

    bad:{
        name:"bad", 
        value: bad
            },
            
    neutral:{
          name:"neutral", 
          value: neutral
              }
}

 
let all = good + bad + neutral
  return (
    <div>
      <Display text="Give feedback"/>
      <Button text='good'  onClick={update(good+1,'good')}/>
      <Button text='bad'  onClick={update(bad+1,'bad')}/>
      <Button text='neutral'  onClick={update(neutral+1,'neutral')}/>
      <Statistics state={object} all={all}/>
    </div>
  )
}

export default App