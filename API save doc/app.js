const express = require("express");
const axios = require("axios");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    const { titulo, autor, genero, enlaceImg, caracteristicas, estado } =
      req.body;
    const pdfFile = req.file;
    const enlace_pdf = pdfFile.originalname;

    const response = await axios.post("http://localhost:5000/agregar-libro", {
      titulo,
      autor,
      caracteristicas,
      genero,
      enlaceImg,
      enlace_pdf,
      estado,
    });

    if (response.status === 201) {
      res.send("Libro guardado exitosamente en ambas APIs.");
    } else {
      res.status(500).send("Error al guardar el libro en la primera API.");
    }
  } catch (error) {
    console.error("Error al guardar el libro:", error);
    res.status(500).send("Error al guardar el libro en la segunda API.");
  }
});

app.get("/pdf/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);

  res.sendFile(filePath);
});

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "imagenes/");
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    req.generatedFileName = filename;
    cb(null, filename);
  },
});

const imageUpload = multer({ storage: imageStorage });

app.post("/upload-image", imageUpload.single("imagen"), async (req, res) => {
  try {
    const imagenFile = req.file;
    const idLibroSeleccionado = req.body.id_libro;
    const generatedFileName = req.generatedFileName;

    const response = await axios.post(
      "http://localhost:5000/actualizar-enlace-img",
      {
        idLibroSeleccionado,
        generatedFileName,
      }
    );

    if (response.status === 200) {
      res.send("Libro guardado exitosamente en ambas APIs.");
    } else {
      res.status(500).send("Error al guardar el libro en la primera API.");
    }
  } catch (error) {
    console.error(
      "Error al subir la imagen o actualizar el enlace_img:",
      error
    );
    res
      .status(500)
      .send("Error al subir la imagen o actualizar el enlace_img.");
  }
});

app.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "imagenes", filename);
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
