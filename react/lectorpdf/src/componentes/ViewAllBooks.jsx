import { useState, useEffect } from "react";
import axios from "axios";

const ViewAllBooks = () => {
  const [libros, setLibros] = useState([]);
  const [mostrarFormularioImagen, setMostrarFormularioImagen] = useState(false);
  const [imagenFile, setImagenFile] = useState(null);
  const [idLibroSeleccionado, setIdLibroSeleccionado] = useState(null); // Estado para almacenar el ID del libro seleccionado
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const obtenerLibros = async () => {
      try {
        const response = await axios.get("http://localhost:5000/libros");
        setLibros(response.data);
      } catch (error) {
        console.error("Error al obtener los libros:", error);
      }
    };

    obtenerLibros();
  }, []);

  const handleAgregarImagen = (idLibro) => {
    setIdLibroSeleccionado(idLibro);
    console.log(idLibro); // Al hacer clic en "Agregar Imagen", establece el ID del libro seleccionado
    setMostrarFormularioImagen(true);
  };

  const handleImagenChange = (e) => {
    setImagenFile(e.target.files[0]);
  };

  const handleSubmitImagen = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("imagen", imagenFile);
      formData.append("id_libro", idLibroSeleccionado); // Agrega el ID del libro al FormData

      const response = await axios.post(
        "http://localhost:3000/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setMensaje("Imagen subida exitosamente.");
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      setMensaje("Error al subir la imagen.");
    }

    setMostrarFormularioImagen(false);
  };

  return (
    <div className="container" style={{ backgroundColor: "gray" }}>
      <h2>Lista de Libros</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Título</th>
            <th>Género</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => (
            <tr key={libro.id_libro}>
              <td>{libro.titulo}</td>
              <td>{libro.genero}</td>
              <td>{libro.estado}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAgregarImagen(libro.id_libro)}
                >
                  Agregar Imagen
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {mostrarFormularioImagen && (
        <div>
          <h3>Subir Imagen</h3>
          <form encType="multipart/form-data" onSubmit={handleSubmitImagen}>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleImagenChange}
            />
            <button type="submit">Subir Imagen</button>
          </form>
        </div>
      )}

      {mensaje && <p>{mensaje}</p>}
      <div>
        <a href="/" className="btn btn-primary my-5">
          regresar
        </a>
      </div>
    </div>
  );
};

export default ViewAllBooks;
