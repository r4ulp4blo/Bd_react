import { useState, useEffect } from "react";
import axios from "axios";

const InsertBooks = () => {
  const [libros, setLibros] = useState([]);
  const [libro, setLibro] = useState({
    id_libro: "",
    titulo: "",
    datos_autor_caracteristicas: "",
    genero: "",
    estado: "",
  });
  const [pdfFile, setPdfFile] = useState(null);

  const fetchLibros = () => {
    axios
      .get("http://localhost:5000/libros", libros)
      .then((response) => {
        setLibros(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener libros:", error);
      });
  };
  useEffect(() => {
    fetchLibros();
  }, []);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setLibro({ ...libro, [name]: value });
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };

  const handleCrear = async () => {
    try {
      const formData = new FormData();
      formData.append("titulo", libro.titulo);
      formData.append("autor", libro.autor);
      formData.append("genero", libro.genero);
      formData.append("enlaceImg", libro.enlaceImg);
      formData.append("caracteristicas", libro.caracteristicas);
      formData.append("pdf", pdfFile);
      formData.append("estado", libro.estado);

      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Libro creado:", response.data);
      fetchLibros();
      resetLibro();
    } catch (error) {
      console.error("Error al crear libro:", error);
    }
  };

  const handleActualizar = () => {
    axios
      .put(`http://localhost:5000/actualizar-libro/${libro.id_libro}`, libro)
      .then((response) => {
        console.log("libro actualizado:", response.data);
        fetchLibros();
        resetLibro();
      })
      .catch((error) => {
        console.error("Error al actualizar sala:", error);
      });
  };
  const handleEliminar = (id_libro) => {
    axios
      .delete(`http://localhost:5000/eliminar-libro/${id_libro}`)
      .then((response) => {
        console.log("libro eliminado:", response.data);
        alert("La sala: " + id_libro + " ha sido eliminada");
        fetchLibros();
      })
      .catch((error) => {
        console.error("Error al eliminar proveedor:", error);
      });
  };

  const resetLibro = () => {
    setLibro({
      id_libro: "",
      titulo: "",
      datos_autor_caracteristicas: "",
      genero: "",
      estado: "",
    });
    setPdfFile(null);
  };
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">
                Formulario para Guardar Libro
              </h3>
              <form>
                <div className="form-group">
                  <label>Título del Libro:</label>
                  <input
                    type="text"
                    name="titulo"
                    className="form-control"
                    value={libro.titulo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Autor del Libro:</label>
                  <input
                    type="text"
                    name="autor"
                    className="form-control"
                    value={libro.autor}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Género del Libro:</label>
                  <input
                    type="text"
                    name="genero"
                    className="form-control"
                    value={libro.genero}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Subir PDF:</label>
                  <input
                    type="file"
                    name="enlace_pdf"
                    className="form-control-file"
                    accept=".pdf"
                    onChange={handleFileInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Características del Libro:</label>
                  <textarea
                    className="form-control"
                    name="caracteristicas"
                    value={libro.caracteristicas}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Estado:</label>
                  <input
                    type="text"
                    name="estado"
                    className="form-control"
                    value={libro.estado}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary mt-2 mx-2"
                    onClick={handleCrear}
                  >
                    Guardar Libro
                  </button>
                  <button
                    onClick={handleActualizar}
                    className="btn btn-dark mt-2 mx-2"
                  >
                    Editar
                  </button>
                  <a href="/" className="btn btn-primary mt-2">
                    Regresar
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Género</th>
                <th>Características</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {libros.map((libro) => (
                <tr key={libro.id_libro}>
                  <td>{libro.titulo}</td>
                  <td>{libro.autor}</td>
                  <td>{libro.genero}</td>
                  <td>{libro.caracteristicas}</td>
                  <td>{libro.estado}</td>
                  <td className="d-flex">
                    <button
                      className="btn btn-primary btn-sm mx-2"
                      onClick={() => setLibro(libro)}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(libro.id_libro)}
                      className="btn btn-danger btn-sm mx-2"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InsertBooks;
