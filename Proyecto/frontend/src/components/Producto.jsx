import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Enlace from '../assets/Backend.jsx';
import {useCarrito} from "../components/Carritoprovider.jsx";
import {useAutenticacion} from "../Authentication/Autenticacion.jsx";


const Producto = ({producto}) => {
    const {añadirAlCarrito, añadirUsuario} = useCarrito();
    const {isAuthenticated, obtenerUsuario} = useAutenticacion();

    const clickCarrito = () => {
        añadirAlCarrito({
            _id: producto._id,
            unidades: 1
        });
        if (isAuthenticated) {
            añadirUsuario(obtenerUsuario()._id);
        }
    }

    return (
        <div className={"grid gap-2 grid-cols-1 md:grid-cols-4 items-center justify-center"}>
            <div className='relative'>
                <button onClick={clickCarrito} className={"z-10 absolute top-0 right-0 p-2 rounded-full hover:bg-gray-400"}>
                    Añadir al carrito
                    </button>
                <Link title={producto.nombre} to={`/producto/${producto._id}`} className="flex flex-col items-center justify-center">
                </Link>
                {producto.unidades === 0 && <div>
                    <p className="absolute top-0 right-0 p-2 bg-red-500 text-white font-bold">Agotado</p>
                </div>}
                {producto.unidades === 1 && <div>
                    <p className="absolute top-0 right-0 p-2 bg-green-500 text-white font-bold">
                        Disponible {producto.unidades} unidades!</p> </div>}
            </div>
            <div className='place-self-center flex justify-center gap-8'>
                <div className='flex gap-2'>
                    <p>${(producto.precio * (1 - producto.descuento/100)).toFixed(2)}</p>
                    {producto.descuento !== 0 && <p className='line-through'>${(producto.precio).toFixed(2)}</p>}
                </div>
            {producto.descuento > 0 && <p className='text-red-500'>-{producto.descuento}%</p>}
            </div>
            <div>
                <h3 title={producto.nombre} className='text-center font-bold text-lg'>{producto.nombre}</h3>
                <p title={producto.descripcion} className='text-center'>{producto.descripcion}</p>
            </div>
        </div>
    )
}
Producto.propTypes = {
    producto: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired,
        descuento: PropTypes.number.isRequired,
        descripcion: PropTypes.string.isRequired,
        unidades: PropTypes.number.isRequired
    })
}

export default Producto
