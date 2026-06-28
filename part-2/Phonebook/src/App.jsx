import { useState,useEffect } from 'react'
import axios from 'axios'
import personServices from './services/persons';
import './index.css';


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
    if(e.target.event===""){
      setFilter(false)
    }
  }
return(
   <div><form onSubmit={numFilter}>filter shown with: <div><input onChange={handleFilter}/><button type="submit">Filter</button></div> </form></div>
)
}

const AddPopUp = ({msg,setAddMsg})=>{
  if(msg===null){
    return null;
  }
  return(
    <div className='popup'>
      {msg}
    </div>
  );
}

const PersonForm=({newName,newNumber,setNewName,setNewNumber,setPersons,persons, setAddMsg})=>{
  const addName=(event)=>{
    event.preventDefault();
    let exist = false;
    let prevId="";
    let nameObj={
      name: newName,
      number: newNumber,
      id: String(persons.length+1),
    }
    persons.forEach(e => {
      if(e.name===newName){
        exist = true
        prevId=e.id;
      }
    });
    if(exist===false){
      personServices.add(nameObj)
      .then(r=>{
        setPersons(persons.concat(r))
        setAddMsg(`${r.name} added`);
        setTimeout(() => {
          setAddMsg(null)
        }, 5000);
      })
      
    }else{
      const check = confirm(`${newName} is already added to phonebook, click yes to change number: `)
      if(check){
        const obj = persons.find(p=>p.id===prevId)
        const newPw = {...obj, number: nameObj.number}
        personServices.update(prevId,nameObj)
        .then(r=>{
          setPersons(persons.map(p=>p.id===prevId?newPw:p))
        }
        )
      }
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
const Person=({persons,setPersons,isFiltered,newFilter})=>{
const clear=(id)=>{
const per = persons.find(n => ((n.id)===(id)))
   personServices.del(id)
   .then(r=>{
    setPersons(persons.filter(e=>e!==per))
   }
   )
}
  return(
    <div>
     <h2>Numbers</h2>
      { isFiltered?persons.filter((e)=> e.name.toLowerCase().includes(newFilter.toLowerCase())).map((e,i)=><div key={i}>{e.name} {e.number} <button onClick={()=>clear(e.id)}>delete</button>  </div>):persons.map((e,i)=><div key={i}>{e.name} {e.number}  <button onClick={()=>clear(e.id)}>delete</button> </div>)}
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
  const[addMsg,setAddMsg]= useState(null);
  return (
    <div>
      <AddPopUp msg={addMsg} setAddMsg={setAddMsg}/>
      <Filter isFiltered={isFiltered} setNewFilter={setNewFilter} isFiltered = {isFiltered} setFilter={setFilter}/>
      <PersonForm setAddMsg={setAddMsg} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons}/>
      <Person isFiltered={isFiltered} persons={persons} newFilter={newFilter} setPersons={setPersons}/>
     </div>
  )
}
export default App