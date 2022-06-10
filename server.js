const express = require("express");
const app = express();
const { routerProducto } = require('./routers/routerProducto')
const PORT = process.env.PORT || 8080;

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

app.use(function(req, res) {
    // request invalida
    // res.send('Seras Redirigido Amiguito');
    res.redirect("/");
});

// app.use((req, res) => {
//     res.status(404).send("No le pegue a ninguna ruta");
// });

app.listen(PORT, () => {
    console.log(`Servidor Corriendo en el puerto ${PORT}`);
});
