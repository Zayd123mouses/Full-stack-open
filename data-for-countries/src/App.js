import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props)=>{
    return(
    <>
    <div>
    Find countries <input placeholder='Countrie..' onChange={props.onChange} id="filter"/>
    </div>
   </>
  )
}

const Countries =({arr,search, onClick, isShown})=>{
  const FIRST_ELEMENT = 0
  console.log(search);
  if(arr.length > 10){
    return(
      <div>
        <h2>Too many matches, Specify your filter</h2>
      </div>
    )
  } else if(arr.length > 1){
    return(
      <div>
      {arr.map(countrie=>{
        let index = arr.indexOf(countrie)
        return( 
          <div key={index}>
        <p > {countrie.name.common} <button onClick={onClick} id={index}>Show</button></p>
        {isShown === index &&(
          <OneCountrie countrie={arr[index]}/>
        )}

        </div>
        )
      })}
      
      </div>
    )
  } else if(arr.length === 1){
    return(
      <OneCountrie countrie={arr[FIRST_ELEMENT]}/>
    )
   
  } else if(search === '')
      return (
        <h1>Countries</h1>
      ) 
    

}


const OneCountrie = ({countrie})=>{
  // console.log(countrie)
  return(<div>
  <h1>{countrie.name.common}</h1>
  <p>Capital: {countrie.capital}</p>
  <p>Area: {countrie.area}</p>
  <h3>Languages:</h3>
  <Languages languages={countrie.languages}/>
  <br/>
  <Image img={countrie.flags} flag_name={countrie.name.common}/>
  <Wheather countrie={countrie.name.common} capital={countrie.capital}/>
  </div>
  )
}

const Wheather = ({capital})=>{
  
  const [weather, setWeather] = useState({location:{}, current: {}});
  const [loading, setLoading] = useState(true);

     useEffect(()=>{
   axios
   .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}`)
//   // .get('http://localhost:3001/persons')
  .then(response=>{
     console.log("wehater is here ",response.data )
     setWeather(response.data)
     setLoading(false)
   }).catch(error=> console.log('the error ',error))
 },[capital])

  // console.log(wheather , 'In another componet')
  return loading ? <p>Loading...</p> :
  (
    <div>
      <h1>Weather in {capital} </h1>
      <h4>temperature: <small>{weather.main.temp} Celcius</small></h4> 
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='icon'/>
      <h4>Wind {weather.wind.speed} m/s</h4>
     
    </div>
  )
}


const Languages = ({languages})=>{
  // console.log(Object.values(languages))
  return(
  <>
  {Object.values(languages).map(value=>{
    return(
      <li key={value}>{value}</li>
    )
  })}
  </>
  )
}


const Image =({img,flag_name})=> 
  <div>
     <img src={img.png} alt={flag_name + 'Flag'}/>
   </div>
  

function App() {
  const [countries, setCountries] = useState([])
  const [filtredCountries, setFiltred] = useState([])
  const [isShown, setIsShown] = useState(null);



const hook = () =>{
  console.log("fetching data...")
  axios
   .get("https://restcountries.com/v3.1/all")
   .then(response=>{
    // console.log(response.data)
    setCountries(response.data)
   })
}

useEffect(hook,[])


var search = ''
const handleChnage = (event)=>{
  search = event.target.value
  // console.log("value of event", event.target.value, "value of search is", search)
  // console.log(event.target.value)
  const newarr = countries.filter(countrie=> countrie.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
  if(search === ''){
    setFiltred([])
  }else{
    setFiltred(newarr)

  }
}
 console.log(filtredCountries)

const hadnleClick = (event) =>{
  console.log(event.target.id)
  let id = parseInt(event.target.id)
  id === isShown
  ? setIsShown(null)
  : setIsShown(id)
}

  return (
    <div className="App">
      <Filter onChange={handleChnage}/>
     
      <Countries arr={filtredCountries} search ={search} onClick={hadnleClick} isShown={isShown} />
      
    </div>
  );
}

export default App;
