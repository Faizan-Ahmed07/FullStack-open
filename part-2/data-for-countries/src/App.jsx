import {useState,useEffect} from "react";
import axios from 'axios';


const Search = ()=>{
  return(
    <div>
      <form >
        <input/>
        <button type='submit'>Search</button>
      </form>
    </div>
  )
}


const App =()=>{
  const [countries, setCountries] = useState(null)
  useEffect(()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then((p)=>{
      console.log(p)
      setCountries(p.data)
    }
    )
  },[countries])
  console.log(countries)
  if(!countries){
    return null
  }
  return (
    <div>
      <Search/>
      <ul>
          {countries.map((e)=><li>{e.name.common}</li>)}
      </ul>
     
    </div>
  )
}
export default App;