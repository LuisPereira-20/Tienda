import { Link } from "react-router-dom";
import Fecha from "../assets/FormatoFecha";
import PropTypes from 'prop-types';


const Compras = ({compras, isAdmin=false}) => {
    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <h2>Compra ID: {compras._id}</h2>
            <div className="flex gap-4 flex-col p-4">
                <p>Fecha de creacion: {Fecha(compras.FechaCreacion)}</p>
                <p>Total: ${compras.Total}</p>
            </div>
            <div>
            <Link className="w-20 p-2 rounded-xl bg-blue-400 hover:bg-blue-600 hover:scale-110 " 
                to = {isAdmin ? `/administrador/compras/${compras._id}` : `/compras/${compras._id}`}>Ver detalles</Link> 
            </div>
        </div>
    )
}

Compras.propTypes = {
    compras: PropTypes.object,
    isAdmin: PropTypes.bool
}

export default Compras