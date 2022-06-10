const fs = require("fs");
const express = require("express");
const app = express();
const { Router } = express;
const routerProducto = Router();
const multer = require("multer");
const storage = multer({ destinantion: "/upload" });
const PORT = process.env.PORT || 8080;

let productContainer = require("./clases/main");

// Codigo del server

// Middleware para parsear el Body. Sin esto no obtenemos el Body. SIEMPRE QUE USAMOS POST HAY QUE USARLO.
// El body llega como strings. Lo que hace el middleware es transformarlo en JSON y mandarlo a la funcion que debe controlarlo.
app.use(express.json());
// Hace lo mismo pero con dato de formularios. Un form en HTML viene en forma de URL encoded y esto lo trasnforma en formulario.
app.use(express.urlencoded({ extended: true }));

// Va a buscar en la carpeta PUBLIC si existe el archivo buscado.
app.use(express.static("public"));

// Router
app.use("/api", routerProducto);

routerProducto.get("/productos", (req, res, next) => {
    const mostrarProductos = async () => {
        const productos = new productContainer("productos.txt");
        const showProductos = await productos.getAll();
        res.send(showProductos);
    };
    mostrarProductos();
});

routerProducto.get("/productos/:id", (req, res, next) => {
    let id = parseInt(req.params.id);
    const mostrarProdID = async () => {
        const productos = new productContainer("productos.txt");
        const mostrarID = await productos.getById(id);
        res.send(mostrarID);
    };
    mostrarProdID();
});

const productoSubido = storage.fields([
    { title: "title", price: "price", thumbnail: "thumbnail" },
]);

routerProducto.post("/productos", productoSubido, async (req, res, next) => {
    const subirProduct = async () => {
        let produc = new productContainer("productos.txt");
        if (
            req.body.title === "" ||
            req.body.price === "" ||
            req.body.thumbnail === ""
        ) {
            res.status(400).send({
                error: "No se pudo cargar el producto. Complete los campos vacios.",
            });
        } else {
            await produc.metodoSave(req.body);
            res.send(req.body);
        }
        next();
    };
    subirProduct();
});

routerProducto.delete("/productos/:id", (req, res) => {
    let id = parseInt(req.params.id);
    const eliminoPorID = async () => {
        const productos = new productContainer("productos.txt");
        const mostrarID = await productos.deleteById(id);
        res.send(`elemento con el ${id} eliminado`);
    };
    eliminoPorID();
})


app.listen(PORT, () => {
    console.log(`Servidor Corriendo en el puerto ${PORT}`);
});
