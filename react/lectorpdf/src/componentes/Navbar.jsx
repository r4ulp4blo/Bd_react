function Navbar() {

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/val1" className="nav-link btn btn-primary">
                Ingresa datos de libros
              </a>
            </li>
            <li className="nav-item">
              <a href="/val2" className="nav-link btn btn-primary">
                Ingresa imagen a los libros
              </a>
            </li>
            <li className="nav-item">
              <a href="/val3" className="nav-link btn btn-primary">
                Resultado
              </a>
            </li>
            <li className="nav-item">
              <a href="/val4" className="nav-link btn btn-primary">
                Resultado 2
              </a>
            </li>
          </ul>
          <div className = "login-container">
            <a href="/val5" className="btn btn-primary">
              Login
            </a>
          </div>
        </div>
      </nav>
      
    );
  }
  
  export default Navbar;