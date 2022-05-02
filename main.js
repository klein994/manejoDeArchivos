const fs = require('fs')
const productos = './productos.json'
class Contenedor {
    constructor(path) {
        this.path = path

    }

    save(Objeto) {

        try {
            let product = this.getAll()
            product.push(Objeto)
            fs.writeFileSync(this.path, JSON.stringify(product))
            console.log(`Objeto Guardado ID = ${product.length}`)

        } catch (error) {
            throw error
        }

    }

    getById(id) {

        try {
            console.log(`Get id ${id}`)
            let products = fs.readFileSync(this.path, 'utf-8')
            let items = JSON.parse(products)
            let item = items.filter(obj => obj.id === id)
            console.log(item)
        } catch (error) {
            throw error
        }
    }

    getAll() {
        try {
            const products = fs.readFileSync(this.path, 'utf-8')
            let items = JSON.parse(products)
            return items
        } catch (error) {
            throw error
        }

    }

    deleteById(id) {

        try {

            let products = fs.readFileSync(this.path, 'utf-8')
            let items = JSON.parse(products)
            let item = items.findIndex(obj => obj.id === id)
            if (item >= 1) {
                items.splice(item, 1)
            } else {
                console.log(`El id ${id} no fué encontrado `)
            }

            fs.writeFileSync(this.path, JSON.stringify(items))
            console.log(`Borrado el id:${id}`)

        } catch (error) {
            throw error
        }
    }

    async deleteAll() {
        try {
            await fs.writeFileSync(this.path, '[]')
            console.log('Elimina todos los elementos ')
        } catch (error) {
            throw error
        }
    }

}
console.log('=== Array inicial ===')
let arrayInicial = new Contenedor(productos);
console.log(arrayInicial.getAll());

console.log('=== Guarda Objeto ===')
let save = new Contenedor(productos);
save.save({ tittle: "Tijeras", price: 250.01, thumbnail: "image4", id: arrayInicial.getAll().length + 1 });

console.log('=== get por id  ===')
let getById = new Contenedor(productos);
getById.getById(2);

console.log('=== getAll ===')
let getAll = new Contenedor(productos);
console.log(getAll.getAll());

console.log('=== Borrar por id ===')
let deleteById = new Contenedor(productos);
deleteById.deleteById(3);

console.log('=== getAll Despues de borrar el id 3 ===')
console.log(getAll.getAll());


console.log('=== Borrar todo ===')
let deleteAll = new Contenedor(productos);
deleteAll.deleteAll();

// json original pa cuando se borre ;)
// [{
//     "tittle": "Escuadras",
//     "price": 123.45,
//     "thumbnail": "image1",
//     "id": 1
//   },
//   {
//     "tittle": "Calculadora",
//     "price": 456.78,
//     "thumbnail": "image2",
//     "id": 2
//   },
//   {
//     "tittle": "Globo Terráqueo",
//     "price": 789.01,
//     "thumbnail": "image3",
//     "id": 3
//   }]