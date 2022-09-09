animals = [
    {name:"horn", type:"dog"},
    {name:"fluffy", type:"rabit"}
]

var names = animals.map( animal => animal.name)
let types  = animals.filter(animal => animal.type === 'dog')
console.log(names)
console.log(types);