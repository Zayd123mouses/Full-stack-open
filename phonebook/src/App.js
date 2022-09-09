import { useState, useEffect } from 'react'
import personsService from './services/persons'

const Person = ({person, handleDelete})=>

 <p >{person.name} {person.number} <button onClick={handleDelete}>Delete</button></p>
 
 
const Filter = (props)=> {
return(
  <div>
     {props.text}<input id='filter' onChange={props.onChange}  placeholder={props.placeholder}/>
  </div>
)}

const Form = (props)=>{
  return(
    <form onSubmit={props.onSubmit}>
    <div>
      name: <input value={props.value1} onChange={props.onChange1} placeholder='Name...'/>
      <div>  
      Number: <input value={props.value2} onChange={props.onChange2} placeholder='Number...' type="number"/>
      </div>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const NotificationMessage = ({message, error})=>{
if(message === null){
  return null
}
 return (
  <div className={error ? 'error' : 'updated'}>

    {message}
  </div>

)}



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [arrFiltred, setFiltredArr] = useState([])
  const [searchinput, setsearchinput] = useState(false)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)





  const hook =() => {   
    personsService.getAll()
     .then(response=>{
      setPersons(response)

     })
  }

useEffect(hook,[])

const array = searchinput
? persons.filter(person=>person.name.toLowerCase().includes(arrFiltred))
: persons

const handleSubmit = (event)=>{
  event.preventDefault()
  const isPresent = persons.find(person=> person.name.toLowerCase() === newName.toLowerCase())
  if(isPresent || newName === ''){
    if(window.confirm(`${newName} is already on the  phonebook, Replce the orld number with the old one?`)){
      const newobj = {name: newName,
                      number: newNumber
                      }
      personsService
      .update(isPresent.id,newobj)
      .then(returnObj=>{
        setPersons(persons.map(person=> person.id === returnObj.id ?returnObj: person))
    
     handlenotification(`${returnObj.name} Number had been updated`, false)
      }).catch(error=>{
        
        handlenotification(`${isPresent.name} Already deleted from the server`, true)
        setPersons(persons.filter(person=> person.id !== isPresent.id))
        console.log(error)
      })

    }
    
    
  } else {

  const newobj = {
    name: newName,
    number: newNumber
  }

  personsService.create(newobj)
  .then(newperson => {
    setPersons(persons.concat(newperson))

    handlenotification(`${newperson.name} Has been added succesfully`,false)
 })

  .catch(error=>handlenotification("Something went wrong ...Please try Later",true))
  
}
  setNewName('')
  setNewNumber('') 


}



const handleChnageName = event=> setNewName(event.target.value)
const handleChnageNumber = event=> setNewNumber(`${event.target.value}`)


const filtred = (event)=>{
  event.target.value === '' ? setsearchinput(false): setsearchinput(true)
  setFiltredArr(event.target.value)
}


const handleDelete = (id, name)=> {

   if(window.confirm("Are you sure you want to delete")){
      console.log(id) 
      personsService
      .deletePerson(id)
      .then(deleted=> {
      console.log( name)
      handlenotification(`${name} Has been deleted from the phonebook`, false)
      })
      .catch(error=>{ 
        handlenotification(`${name} Has already been deleted`, true)
        console.log(error)
      })
      console.log(persons)
      setPersons(persons.filter(person=> person.id !== id))
    }

}




const handlenotification = (message, type) =>{
  setNotification(message)
  setError(type)

  setTimeout(() => {
    setNotification(null)
  }, 2000)

}



  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
     <NotificationMessage message={notification} error={error}/>
     </div>
        <Filter text=" Fast filter shown with"  placeholder='Filter...' onChange={filtred}/>

        <h3>Add a new</h3>

        <Form onSubmit={handleSubmit}  value1={newName} onChange1={handleChnageName} value2={newNumber} onChange2={handleChnageNumber}/>

      <h2>Numbers</h2>
       {
             array.map(person=>
            <Person key={person.id} person={person} handleDelete={()=>handleDelete(person.id, person.name)}/>
        )}
        

    </div>
  )
}

export default App