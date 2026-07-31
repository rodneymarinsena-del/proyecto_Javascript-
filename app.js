//const express = require('express');
import express from 'express';
//leer el archivo .env 
import {configDotenv} from "dotenv"
configDotenv()

const app = express();
const port = process.env.puerto || 7000;
app.get("/", (_, res) => {res.send("Aprendiendo express,ficha 3407181,adso en el sena de la 52 31/07/26");
});

app.get("/otraruta",(req, res) => {
    res.send(`<h1>prueba de estilos</h1>
        <h2>prueba de estilos</h2>
        <h3>prueba de estilos </h3>
        <h4>prueba de estilos </h4>
        <h5>prueba de estilos </h5>
        <h6>prueba de estilos </h6>`)
        
    }
);

app.get("/ruta3/:aprendiz/:otrodado",(req, res) => {
    const dato_aprendiz = req.params.aprendiz
    const dato_otrodado = req.params.otrodado
    res.json({"nombre": dato_aprendiz, "otrodado": dato_otrodado})
    }
);

app.get("/ruta2",(req, res) => {
    res.json({"nombre": "Rodney","apellido": "Marin", "edad": 20, })
        
    }
);


app.get("/ruta4",(req, res) => {
    const orden = req.query.orden || "sin ordenar"
    const pagina = req.query.pagina || 1
    res.send(`<h1>listado de aprendices</h1>
        <p> El listado esta en orden ${orden}<p>
        <p> Pagina: ${pagina}<p>`)
});


app.listen(port, function() {

    
console.log( `Servidor: http://localhost:${port}`);
});
