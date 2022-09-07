function Header({course}){
  return(
    <>
    <h1>{course.name}</h1>
    </>
  )
}


function Content({course}){
let list = []
let length = course.parts.length
for (let i =0; i < length; i++){
  list.push(<p key={i}>{course.parts[i].name} {course.parts[i].exercises}</p>)
}
console.log(list)
  return(
    <>
     {list}
    </>
  )
}

function Total({course}){
  let totals = 0
  let length = course.parts.length
  for (let i =0; i < length; i++){
    totals += course.parts[i].exercises
  }

  return(
    <>
    <p>Number of exercises {totals}</p>
    </>
  )
}


const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
    <div>
      <Header course={course} />
      <Content course={course}/> 
       <Total course={course} /> 
    </div>

    </>
  )
}

export default App
