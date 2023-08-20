function ImagenComponent(props) {
  const { filename } = props;

  // Construye la URL completa para la imagen
  const imageUrl = `http://localhost:3000/images/${filename}`;

  return (
    <div>
      <img style={{ width: "80px" }} src={imageUrl} alt="Imagen del libro" />
    </div>
  );
}

export default ImagenComponent;
