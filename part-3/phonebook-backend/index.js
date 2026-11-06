const express = require('express')
const morgan = require('morgan')


const app = express()
app.use(express.json())
app.use(express.static('dist'))

morgan.token('myPOST',(req,res)=>{
    return JSON.stringify(req.body)
})


app.use(morgan(':method :url :response-time :status :myPOST'))


const PORT = 3001
const now = new Date()


app.listen(PORT, ()=>{
    `Listening port ${PORT}`
})

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(request, response)=>{
    response.json(persons)
})

app.get('/api/info',(request,response)=>{
    const available = persons.reduce((acc,cur)=>
       ++acc
    ,0)
   response.send(` <p>Phonebook has info for ${available} people <br> ${now} </p>` )
})

app.get('/api/persons/:id',(req,res)=>{
    const id = req.params.id
    const person = persons.find(e=> e.id===id)
    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }
})

app.post('/api/persons',(request,response)=>{
    const body = request.body
    if(!body.name || !body.number){
        return response.status(400).json({error: "missing content"})
    }

    const person = {
        "id": String(Math.floor(Math.random()*100000)),
        "name": body.name,
        "number": body.number
    }

    let unique = true
    persons.forEach(p=> {
        if(p.name === person.name){
            response.status(400).json({ error: 'name must be unique' })
            unique = false
        }
    })
    if(unique){
        persons = persons.concat(person)
        response.json(person)
    }
})
