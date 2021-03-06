// ENTREGA PROYECTO FINAL CODERHOUSE

const fs = require("fs");
// import moment from 'moment';
const moment = require('moment'); // require


// Check if the file exists
let fileExists = fs.existsSync("carrito.txt");
console.log("carrito.txt exists:", fileExists);

// If the file does not exist
// create it
if (!fileExists) {
    console.log("Creating the file");
    fs.writeFileSync("carrito.txt", "[]");
    console.log("Archivo carrito.txt Creado!");
}

module.exports = class ContenedorCarrito {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    /**
     * @param {json} producto
     * Metodo para guardar un producto. Al terminar de grabar, muestra por pantalla el ID del producto agregado.
     */
    async metodoSave(producto) {
        try {
            const contenido = JSON.parse(
                await fs.promises.readFile(this.nombreArchivo)
            );
            producto.id = contenido.length + 1;
            producto.timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');

            contenido.push(producto);
            await fs.promises.writeFile(
                this.nombreArchivo,
                JSON.stringify(contenido)
            );
            console.log("El Id del Producto es " + producto.id);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Metodo para obtener todos los productos del carrito
     */
    async getAll() {
        try {
            const contenido = JSON.parse(
                await fs.promises.readFile(this.nombreArchivo)
            );
            console.log(contenido);
            return contenido;
        } catch (error) {
            console.log("Error en getAll", error);
            return [];
        }
    }
    /**
     * Metodo para obtener un producto con su ID
     * @param {int} id el id del producto
     * @returns
     */
    async getById(id) {
        try {
            const contenidoCrudo = JSON.parse(
                await fs.promises.readFile(this.nombreArchivo)
            );
            const contenido = contenidoCrudo.find((p) => p.id === id);
            return contenido;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const contenidoCrudo = JSON.parse(
                await fs.promises.readFile(this.nombreArchivo)
            );
            let prodId = contenidoCrudo.filter((p) => p.id !== id);
            await fs.promises.writeFile("productos.txt", JSON.stringify(prodId));
            return prodId;
        } catch (e) {
            console.log(e);
        }
    }
}

