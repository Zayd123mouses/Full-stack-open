import { useState } from 'react'

const Display = props => <div>{props.value}</div>


const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)


const setToValue = (newValue) => () =>{
  console.log('value now', newValue)  // print the new value to console
  setValue(newValue)
}


// const hello = (who) => () => {

//   console.log('hello', who)
//   }


  return (
    <div>
      <Display value={value}/>
      <Button onClick={setToValue(1000)} text='setvalue'/>
      <button onClick={setToValue(0)}>button</button>
      <button onClick={setToValue(value + 1)}>button</button>
    </div>
  )
}

export default App