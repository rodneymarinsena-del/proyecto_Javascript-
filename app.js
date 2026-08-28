
const express = require('express');
const app = express();
const port = 3000;
//configurar para la lectura del archivo
const sistemaArchivo = require("fs")
const ruta = require("path")
const rutaArchivoJson = ruta.join(__dirname, "datos.json")

app.get("/", (_, res) => {
res.send("API Rest - Aprendices");
});
app.listen(port, () => {
console.log( `Servidor en funcionamiento en el puerto: ${port}`);
});

// OTRO ENDPOINT
app.get("/otra", (_, res) => {
res.send("API Rest Aprendices");
});

//endpoint para ver los datos del archivo
app.get("/otra/aprendices", (req, res)=>{
    //datos vienen del archivo
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos)=>{
        if(error){
            return res.json({Error: "No se puede leer los datos."})
        }
        const listaAprendices = JSON.parse(datos)
        res.json(listaAprendices)
    })
});
app.post ("/api/aprendices",(req,res)=>{
    res.json({mensaje: "trabajando en el endpoint"})
})

app.listen(port, function(){
  console.log(`SERVIDOR: http://localhost:${port}`);
});