import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import {useAutenticacion} from "../Authentication/Autenticacion.jsx";
import {useCarrito} from "../components/Carritoprovider.jsx";
import PropTypes from "prop-types";
import CarritodeCompras from "../components/CarritodeCompras.jsx";

const Navbar = ({background}) => {
    const [carro, setCarro] = useState(false);
    const [panel, setPanel] = useState(false);
    const [productos, setProductos] = useState([]);
    const autorizacion = useAutenticacion();
    const {carrito} = useCarrito();
    const usuario = useAutenticacion.Usuario;

    const añadirAlCarrito = () => {
        let item = 0;
        for (let i = 0; i < carrito.productos.length; i++) {
            item += carrito.productos[i].unidades;
        }
        return item;
    }
    useEffect (() => {
        window.scrollTo(0, 0);
        setProductos(añadirAlCarrito())
    }, [carrito])
    return (
        <nav className={"bg-blue-400 items-center flex justify-center md:justify-between p-4 sticky top-0 z-50"+ background}>
            <Link to="/" className="flex gap-2 items-center">
            <span className=" font-bold text-2xl hidden md:block">FarmamigoIV</span>
            </Link>
            <div className="flex gap-4">
                <Link className="font-bold text-lg hover:text-gray-600" to="/" onClick={() => setPanel(false)}>Home</Link>
                <Link className="font-bold text-lg hover:text-gray-600" to="/productos" onClick={() => setPanel(false)}>Productos</Link>
            <span className="font-bold text-lg hover:text-gray-600">Contacto</span>
            <>
                <Link className="font-bold text-lg hover:text-gray-600" to="/login">Login</Link>
                <Link className="font-bold text-lg hover:text-gray-600" to="/registro">Registro</Link>
            </>
            </div>
            <CarritodeCompras className={carro ? "" : "translate-y-[-100%]"} carro={carro} setCarro={setCarro} />
        </nav>
    )
}

Navbar.propTypes = {
    background : PropTypes.string
}

export default Navbar