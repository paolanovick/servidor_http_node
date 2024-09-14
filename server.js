
require("dotenv").config();

const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");

const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/alumno") {
    // Ruta /alumno
    const nombreAlumno = process.env.NOMBRE_ALUMNO || "Desconocido";
    const comision = process.env.COMISION || "Desconocida";
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Alumno: ${nombreAlumno}, Comisión: ${comision}`);
  } else if (req.url === "/info") {
    // Ruta /info (Información del sistema operativo)
    const info = {
      plataforma: os.platform(),
      arquitectura: os.arch(),
      cpus: os.cpus().length,
      memoriaLibre: os.freemem(),
      memoriaTotal: os.totalmem(),
      uptime: os.uptime(),
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(info));
  } else if (req.url === "/static") {
    // Ruta /static (Archivo HTML estático)
    const filePath = path.join(__dirname, "index.html");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error al cargar el archivo HTML");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else {
    // Ruta por defecto (no encontrada)
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Página no encontrada");
  }
});

server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
