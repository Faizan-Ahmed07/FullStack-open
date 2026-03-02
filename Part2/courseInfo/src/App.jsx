
const Header=({name})=>{
  console.log(name)
  return(
    <h1>{name}</h1>
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
  console.log(total)

  // props.course.parts.map((item)=>{
  //   total += item.exercises
  // })

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

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App