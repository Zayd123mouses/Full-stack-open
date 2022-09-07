import { useState } from 'react'


const Display = ({text}) => <div>{text}</div>


const Button = (props) => {
  return (
    <>
    <button onClick={props.onClick}>
       {props.text}
    </button>
    </>
  )
}


const Display2 = (props)=>{
  if(props.max === 0){
    return(
      <>
      <h1>{props.text}</h1>
      <p>All anecdotes has 0 votes</p>
      </>
    )
  } 
return (

  <>
     <h1>{props.text}</h1>
     <Display text={props.anecdotes}/>
     <Display text={"Has " + props.max + " Votes"}/>
  </>
)

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setIndex] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4:0 , 5:0, 6:0, 7:0})

 

const copy = {...points}



const Vote = (index)=>{
  copy[index] += 1
  setIndex(copy)
}


let arr = Object.values(copy);
let max = Math.max(...arr);
let highest = Object.keys(copy).find(key => copy[key] === max);


console.log(highest)
  const random = (max, min) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  } 

  const Select = (newvalue)=>{ 
      setSelected(newvalue)
  }


  return (
    <div>
      <Display text={anecdotes[selected]}/>
      <Display text={"Has " + copy[selected] + " Votes"}/>
      <Button text="Vote" onClick={()=> Vote(selected)}/>
      <Button text=" Next anecdotes" onClick={()=> Select(random(0, anecdotes.length))}/>
      <Display2 text='Anecdotes with most votes' anecdotes={anecdotes[highest]} max={max}/>
    </div>
  )
}

export default App