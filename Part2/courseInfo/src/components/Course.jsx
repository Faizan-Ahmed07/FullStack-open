
const Header=({name})=>{
  console.log(name)
  return(
    <h2>{name}</h2>
  )
}

const Content = ({name,exercises})=>{
  console.log(name, exercises,"from content")
  return(
    <div>
      {name} {exercises}
    </div>
  )
}

const Total = (props)=>{
  const total = props.course.parts.reduce((s, p) => s+p.exercises,0)

  return(
    <h3>Total of {total} exercises</h3>
  )
}

const Course = ({course})=>{
  console.log(course, "From course")
  return(
    <div>
      <Header name = {course.name}/>
      {course.parts.map((item)=>
        <Content name = {item.name} exercises = {item.exercises} key = {item.id} />
      )}
      <Total course = {course}/>
    </div>
  )
}
export default Course