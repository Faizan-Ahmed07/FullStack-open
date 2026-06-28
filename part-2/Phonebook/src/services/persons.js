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
const del=(id)=>{
    return axios.delete(`${baseUrl}/${id}`)
    .then(r=>{
        return r.data
    })
}
const update=(id,obj)=>{
        return axios.put(`${baseUrl}/${id}`,obj)
    .then(r=>{
        return r.data
    })
}
export default {load,add,del,update}