import axios from 'axios';
const baseUrl= "http://localhost:3001/persons";
const load=()=>{
    return axios.get(baseUrl)
   .then(r=>{
        return r.data;
    }
)
}
const add=(obj)=>{
    return axios.post(baseUrl,obj)
    .then(r=>{
        return r.data;
    })
}
export default {load,add}