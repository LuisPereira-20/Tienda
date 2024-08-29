import { Link } from "react-router-dom";
import { useEffect } from "react";

const Administrador = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <div className={"grid gap-4 px-4 py-4"}>
            <h1>Administrador</h1>
            <div className="grid gap-4 grid-cols-2 justify-items-center">
                <div className="flex flex-col items-center gap-4">
                    <img className="w-24 h-24 md:w-32 md:h-32 bg-transparent" src="svg/usuarios.svg" alt="Usuarios" />
                    <Link to="/administrador/usuarios">Usuarios</Link>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <img src="svg/productos.svg" alt="Productos" />
                    <Link to="/administrador/productos">Productos</Link>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <img src="svg/compras.svg" alt="Compras" />
                    <Link to="/administrador/compras">Compras</Link>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <img src="svg/imagen.svg" alt="Categorias" />
                    <Link to="/administrador/categorias">Categorias</Link>
                </div>
            </div>
        </div>
    );
};

export default Administrador;
