//const express = require('express');
import express from 'express';
//leer el archivo .env 
import {configDotenv} from "dotenv"
configDotenv()

const app = express();
const port = process.env.puerto || 7000;
app.get("/", (_, res) => {res.send("Aprendiendo express,ficha 3407181,adso en el sena de la 52 31/07/26");
});
app.listen(port, () => {
console.log( `Servidor en funcionamiento en el puerto: ${port}`);
});
