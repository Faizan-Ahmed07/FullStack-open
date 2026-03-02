
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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return(
  <div>
    <h1>Web Development Curriculum</h1>
    {/* <Course course={courses} /> */}
    {courses.map(course=><Course course={course}/> )}
   </div>
   )
}

export default App