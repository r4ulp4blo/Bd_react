const express = require("express");
const cors = require("cors");
const app = express();
const { Pool } = require("pg");
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "biblio2",
  password: "admin123",
  port: 5432,
});

app.post("/agregar-libro", async (req, res) => {
  try {
    const {
      titulo,
      autor,
      caracteristicas,
      genero,
      enlaceImg,
      enlace_pdf,
      estado,
    } = req.body;
    await pool.query(
      `SELECT insertar_libro(
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
    );`,
      [titulo, autor, caracteristicas, genero, enlaceImg, enlace_pdf, estado]
    );
    res.status(201).json({ mensaje: "Libro agregado con éxito" });
  } catch (error) {
    console.error("Error al agregar el libro:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
app.post("/actualizar-enlace-img", async (req, res) => {
  try {
    const { idLibroSeleccionado, generatedFileName } = req.body;
    await pool.query("SELECT actualizar_enlace_img($1, $2)", [
      idLibroSeleccionado,
      generatedFileName,
    ]);
    res.status(200).json({ mensaje: "Campo enlace_img actualizado con éxito" });
  } catch (error) {
    console.error("Error al actualizar el campo enlace_img:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
app.get("/libros", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id_libro, 
        titulo, 
        autor_car.autor AS autor, 
        autor_car.caracteristicas AS caracteristicas, 
        genero, 
        enlace_img, 
        enlace_pdf, 
        estado 
      FROM libros
      CROSS JOIN LATERAL UNNEST(array[datos_autor_caracteristicas]) AS autor_car
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener los libros:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get("/libros-img", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id_libro, titulo, genero, estado, enlace_img FROM libros"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener los libros:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
app.put("/actualizar-libro/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor, caracteristicas, genero, estado } = req.body;

    const result = await pool.query(
      `UPDATE libros
       SET titulo = $1, datos_autor_caracteristicas = ($2, $3), genero = $4, estado = $5
       WHERE id_libro = $6`,
      [titulo, autor, caracteristicas, genero, estado, id]
    );

    if (result.rowCount === 1) {
      res.status(200).json({ mensaje: "Libro actualizado con éxito" });
    } else {
      res.status(404).json({ error: "Libro no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar el libro:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.delete("/eliminar-libro/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM libros WHERE id_libro = $1", [
      id,
    ]);

    if (result.rowCount === 1) {
      res.status(200).json({ mensaje: "Libro eliminado con éxito" });
    } else {
      res.status(404).json({ error: "Libro no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el libro:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
