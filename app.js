const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.port || 3000;

// IMPORTACIONES
const { validarNombre, validarCorreo, generarId } = require('./utilidades/validaciones');
const sistemaArchivo = require("fs");
const ruta = require("path");
const multer = require("multer"); // Una sola declaración de multer
const registroMiddleware = require("./middleware/registroMiddleware");

const rutaArchivoJson = ruta.join(__dirname, "datos.json");

// CONFIGURAR ALMACENAMIENTO DE MULTER
const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "misImagenes/");
  },
  filename: (req, file, cb) => {
    const extencionArchivo = ruta.extname(file.originalname);
    cb(null, `${Date.now()}${extencionArchivo}`);
  }
});

const subArchivo = multer({ storage: almacenamiento });

// MIDDLEWARES DE PARSEO DE DATOS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MIDDLEWARES DE REGISTRO (Ubicados antes de los endpoints para que capturen TODAS las peticiones)
app.use((req, res, next) => {
  console.log(`tiempo milisegundos: ${Date.now()}`);
  console.log(`fecha: ${new Date().toString()}`);
  next();
});

app.use(registroMiddleware);

// ENDPOINTS

// Endpoint raíz
app.get("/", (req, res) => {
  res.send("API Rest - Aprendices");
});

// OTRO ENDPOINT
app.get("/otra", (req, res) => {
  res.send("API Rest Aprendices");
});

// Endpoint para ver los datos del archivo
app.get("/api/aprendices", (req, res) => {
  sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos) => {
    if (error) {
      return res.status(500).json({ Error: "No se puede leer los datos." });
    }
    const listaAprendices = JSON.parse(datos);
    res.json(listaAprendices);
  });
});

// Endpoint para crear aprendices
app.post("/api/aprendices", subArchivo.single("imagen"), (req, res) => {
  const nuevoAprendiz = req.body;

  // Validar nombre
  if (!validarNombre(nuevoAprendiz.nombre)) {
    return res.status(400).json({ Error: "El nombre debe tener mínimo 3 letras." });
  }

  // Validar correo
  if (!validarCorreo(nuevoAprendiz.correo)) {
    return res.status(400).json({ Error: "El correo electrónico no es válido." });
  }

  nuevoAprendiz.imagen = req.file ? `/misImagenes/${req.file.filename}` : "sin imagen";

  // Lectura y escritura en el archivo JSON
  sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos) => {
    if (error) {
      return res.status(500).json({ Error: "No se puede leer los datos." });
    }
    const listaAprendices = datos ? JSON.parse(datos) : [];

    // Generar ID automáticamente
    nuevoAprendiz.id = generarId(listaAprendices);

    // Agregar el nuevo aprendiz
    listaAprendices.push(nuevoAprendiz);

    // Escribir en el archivo
    sistemaArchivo.writeFile(rutaArchivoJson, JSON.stringify(listaAprendices, null, 2), (error) => {
      if (error) {
        return res.status(500).json({ Error: "No se puede registrar el aprendiz." });
      }
      res.status(201).json({ mensaje: "Aprendiz creado con éxito.", aprendiz: nuevoAprendiz });
    });
  });
});

// Endpoint para modificar
app.put("/api/aprendices/:id", (req, res) => {
  res.status(200).json({ mensaje: "Endpoint en construcción de modificar." });
});

// Endpoint para eliminar
app.delete("/api/aprendices/:id", (req, res) => {
  res.status(200).json({ mensaje: "Endpoint en construcción de eliminar." });
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto: ${port}`);
});