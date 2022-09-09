const Part = ({part})=>  <> {part} </>

const Header = ({name})=> <h1>{name}</h1>

const Content = ({parts}) => {

let sum  = parts.reduce((total, part)=>{
      return total + part.exercises
},0)

return(
<>
    <Part part={parts.map((part)=> <p key={part.id}>{part.name} {part.exercises}</p> )}/>
    <Part part={<b>Total of {sum} exercises</b>}/>
</>
)}



const Course = ({course}) =>{
  return(
    <>
    {course.map(course=>{
      return(
        <div key={course.id}>
        <Header  name={course.name}/>
        <Content  parts={course.parts} />
        </div>
      
      )
       
    })}
   </>
  )
}

export default Course