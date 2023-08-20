import { useState, useEffect } from "react";
import axios from "axios";
import ImagenComponent from "./ImagenComponent";

function LibrosComponent() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/libros-img")
      .then((response) => {
        const librosData = response.data;
        const librosConImagenes = librosData.map((libro) => {
          axios
            .get(`http://localhost:3000/images/${libro.enlace_img}`)
            .then((imagenResponse) => {
              libro.imagen = imagenResponse.data;
            })
            .catch((error) => {
              console.error("Error al obtener la imagen:", error);
            });
          return libro;
        });
        setLibros(librosConImagenes);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de libros:", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="">
        <h1>Lista de Libros</h1>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Título</th>
              <th>Estado</th>
              <th>Solicitar</th>
            </tr>
          </thead>
          <tbody>
            {libros.map((libro) => (
              <tr key={libro.id_libro}>
                <td>
                  <ImagenComponent filename={libro.enlace_img} />
                </td>
                <td>{libro.titulo}</td>
                <td>{libro.estado}</td>
                <td>
                  <button className="btn btn-primary mt-4">
                    prestar libro
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LibrosComponent;
