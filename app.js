import express from 'express'
import {configDotenv} from "dotenv"

configDotenv()

const app = express();
const puerto = process.env.example || 7000
//uso de middleware body-parse
app.use(express.json())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get("/", function(req, res){
  res.send(`Hola, estoy aprendiendo express, ficha 3407181 programa ADSO, 31 de julio`);
});

//otro endpoint
app.get("/otraruta", (req, res)=>{
  //usando template string
  res.send(`<h1>Otro ejemplo de ruta</h1>
    <h2>End point con res.send</h2>
    `);
});

app.get("/ruta2", (req, res)=>{
  res.json({"nombre": "Daniel", "Apellido": "Riaño", "Cargo": "Aprendiz"})
});

app.get("/ruta3/:aprendiz/:otrodato", (req, res)=>{
  const dato_aprendiz = req.params.aprendiz
  const otro_dato = req.params.otrodato
  res.json({"nombre": dato_aprendiz, "Otro": otro_dato})
});

app.get("/ruta4", (req, res)=>{
  //capturar el parametro de consulta query
  const orden = req.query.orden || "sin ordenar"
  const pagina = req.query.pagina || 1
  res.send(`<h1>Listado Aprendices</h1>
    <p>El listado esta en orden ${orden}</p>
    <p>Pagina: ${pagina}</p>
    `);
});

//endpoint para envio de datos formato json
app.post("/ruta2",(req, res)=>{
  const todosDatos = req.body
  const name = req.body.nombre
  const lastname = req.body.Cargo
  res.status(201).json({Datos: todosDatos, nombre: name, Cargo: lastname})
})

app.post("/login",function(req, res){
  const name = req.body.name
  const perfil = req.body.perfil
  const clave = req.body.clave

  if (perfil === "Admin" && clave === "1234"){
    return res.send (`Bienvenido administrador: ${name}, Clave correcta: ${clave}`)
  }
  else{
    return res.send (`Clave incorrecta: ${clave}`)
  }
})

//endpoint para enviar datos formdata
app.post("/formulario", (req, res)=>{
  const datosForm = req.body
  const miNombre = req.body.nombre
  res.status(200).json({Mensaje: "Datos recibidos", nombre: miNombre})
})

app.listen(puerto, function(){
  console.log(`SERVIDOR: http://localhost:${puerto}`);
});