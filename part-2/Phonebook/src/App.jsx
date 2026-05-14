import { useState,useEffect } from 'react'
import axios from 'axios'
import personServices from './services/persons';


const Filter = ({newFilter,setNewFilter,isFiltered,setFilter})=>{
  const handleFilter=(e)=>{
      setNewFilter(e.target.value)
      if(e.target.value === ""){
        setFilter(false)
      }
  }
  const numFilter=(e)=>{
    e.preventDefault()
    setFilter(true)
    console.log(newFilter)
    if(e.target.event===""){
      setFilter(false)
    }
  }
return(
   <div><form onSubmit={numFilter}>filter shown with: <div><input onChange={handleFilter}/><button type="submit">Filter</button></div> </form></div>
)
}
const PersonForm=({newName,newNumber,setNewName,setNewNumber,setPersons,persons})=>{
  const addName=(event)=>{
    event.preventDefault();
    let exist = false;
    let nameObj={
      name: newName,
      number: newNumber,
      id: String(persons.length+1)
    }
 
    persons.forEach(e => {
      if(e.name===newName){
        exist = true
      }
    });
    if(exist===false){
      personServices.add(nameObj)
      .then(r=>{
        setPersons(persons.concat(r))
      })
    }else{
      alert(`${newName} is already added to phonebook`)
    }
  }
  const handleInputName=(event)=>{
      setNewName(event.target.value)
  }
  const handleInputNumber=(event)=>{
      setNewNumber(event.target.value)
  }
return(
    <div>
      <h2>Phonebook</h2>
  <form onSubmit={addName}>
        <div>name: <input onChange={handleInputName}/></div>
        <div>
        </div>
         <div>number: <input onChange={handleInputNumber}/></div>
        <button type="submit">add</button>
      </form>
      </div>
  )
}
const Person=({persons,isFiltered,newFilter})=>{
  return(
    <div>
     <h2>Numbers</h2>
      { isFiltered?persons.filter((e)=> e.name.toLowerCase().includes(newFilter.toLowerCase())).map((e,i)=><div key={i}>{e.name} {e.number} </div>):persons.map((e,i)=><div key={i}>{e.name} {e.number} </div>)}
    </div>
  )
}
const App = () => {
 const [persons, setPersons] = useState([])

  useEffect(()=>{
    const data=personServices.load()
    .then(r=>{
      setPersons(r)
    })
  },[])

  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const [newFilter,setNewFilter]=useState('')
  const [isFiltered,setFilter] = useState(false);

  return (
    <div>
      <Filter isFiltered={isFiltered} setNewFilter={setNewFilter} isFiltered = {isFiltered} setFilter={setFilter}/>
      <PersonForm newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons}/>
      <Person isFiltered={isFiltered} persons={persons} newFilter={newFilter}/>
     </div>
  )
}
export default App