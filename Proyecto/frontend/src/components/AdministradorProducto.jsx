import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import Enlace from '../assets/Backend.jsx';

const copia = (text) => {
    navigator.clipboard.writeText(text);
}

const AdministradorProducto = ({producto}) => {
    return (
        <div className={"flex gap-2 flex-col rounded-xl items-center justify-center"}>
            <p onClick={() => copia(producto._id)} className={"flex p-2 items-center justify-center cursor-pointer"}>ID: {producto._id}</p>
            <Link className='w-full h-full cursor-pointer justify-center' to={`/administrador/productos/${producto._id}`}>
                <img className='h-54 w-64 object-cover rounded-xl' 
                src={Enlace.backend + '/' + (producto.Imagen[0] ? producto.Imagen[0] : 'No hay imagenes')} alt={producto.nombre} />
            </Link>
            <h2 className='font-bold text-xl'>{producto.nombre}</h2>
            <p className='text-md'>Precio: ${producto.precio}</p>
            <p className='text-md'>Stock: {producto.stock}</p>
            <p className='text-md'>Categoria: {producto.Categoria}</p>
            <p>Activo: <span className={producto.Eliminado ? 'text-red-500' : 'text-green-500'}>{producto.Eliminado ? 'Eliminado' : 'Activo'}</span></p>
            <Link className="p-2 text-md" to = {`/administrador/productos/${producto._id}`}>Ver producto</Link>
        </div>
    )
}

AdministradorProducto.propTypes = {
    producto: PropTypes.shape({
        _id: PropTypes.string,
        nombre: PropTypes.string,
        precio: PropTypes.number,
        stock: PropTypes.number,
        Categorias: PropTypes.array,
        Imagen: PropTypes.array,
        Eliminado: PropTypes.bool,
        descripcion: PropTypes.string,
        FechaCreacion: PropTypes.string,
        _v: PropTypes.number,
        FechaActualizacion: PropTypes.string,
        FechaEliminacion: PropTypes.string
    })
}

export default AdministradorProducto