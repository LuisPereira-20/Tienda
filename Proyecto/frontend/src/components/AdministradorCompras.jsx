import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import Fecha from '../assets/FormatoFecha.jsx';

const AdministradorCompras = ({compras}) => {
    const copia = (id) => {
        navigator.clipboard.writeText(id);
    }

    return (
        <div className={"grid gap-2 grid-cols-1 md:grid-cols-4 items-center justify-center"}>
            <button onClick={() => copia(compras._id)} className="w-20 p-2 rounded-xl bg-blue-400 hover:bg-blue-600 hover:scale-110 transition duration-300" title='Copiar'>
                <h2>ID: {compras._id}</h2>
            </button>
            <h3 className='col-span-2 text-md'>
                Usuario: {compras.Usuarios.nombre}
            </h3>
            <div className="flex flex-col items-center justify-center">
                <p>{Fecha(compras.FechaCreacion)}</p>
                <p>Total: ${compras.Total}</p>
            </div>
            <Link className=" col-span-2 w-20 p-2 rounded-xl bg-blue-400 hover:bg-blue-600 hover:scale-110" to = {`/administrador/compras/${compras._id}`}>Ver mas</Link>
        </div>
    )
}

AdministradorCompras.propTypes = {
    compras: PropTypes.shape({
        _id: PropTypes.string,
        Total: PropTypes.number,
        FechaCreacion: PropTypes.string,
        Usuario: PropTypes.string,
        Productos: PropTypes.array,
        _v: PropTypes.number,
        FechaEliminacion: PropTypes.string,
        FechaActualizacion: PropTypes.string,
        Eliminado: PropTypes.bool
    })
}

export default AdministradorCompras