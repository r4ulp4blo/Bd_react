function InicioSesion () {
    return(
        <div className="bg-dark d-flex justify-content-center
        align-items-center vh-100">
            <div className="containerSecudnario">
                <div className="bg-white p-5 rounded-5 text-secondary">
                <div className="text-center fs-1 fw-bold">Bienvenido</div>
                <br></br>
                <div className="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">@</span>
                    <input type = "text" class = "form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping"></input>
                </div>
                <br></br>
                <div className="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">#</span>
                    <input type = "text" class = "form-control" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping"></input>
                </div>                
                <br></br>
                <button className="btn btn-dark text-white w-100 mt-4">Iniciar Sesion</button>
                </div>
            </div>
        </div>
    );
}

export default  InicioSesion;