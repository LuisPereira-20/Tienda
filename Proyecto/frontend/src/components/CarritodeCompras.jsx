import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useCarrito} from "../components/Carritoprovider.jsx";
import Enlace from '../assets/Backend.jsx';
import Espera from "../components/Espera.jsx";
import axios from "axios";
import producto from '../../../backend/Model/Modelo_producto';

const CarritodeCompras = ({className, verCarrito, setverCarrito}) => {
    const {carrito, quitardelCarrito} = useCarrito();
    const [data, setData] = useState([]);
    const [carga, setCarga] = useState(false);
    const obtenerproductos = async () => {
        try {
            const response = await axios.get(`${Enlace.backend}/productos/${producto._id}`);
            return response.data.docs[0];
        } catch (error) {
            console.log(error);
        }
    }
    const obtenertodoslosproductos = async () => {
        try {
            setCarga(true);
            const response = await Promise.all(carrito.producto.map (async (producto) => await obtenerproductos(producto)));
            setCarga(false);
            setData(response);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (verCarrito) {
            obtenertodoslosproductos();
        }
        else {
            setData([]);
        }
    }, [verCarrito]);
    return (
        <div className={"p-4 grid gap-2 w-60 max-h-80 border-2 border-dashed border-gray-500 rounded-lg absolute transform" + className}>
            <h2 className='text-xl'>Productos</h2>
            <div className="grid gap-2 min-h-12">
                {data&&data.length>0? (data.map ((producto, i) => (
                    <div key={producto._id} className="flex items-center gap-2">
                        <p>
                            {producto.nombre}
                        </p>
                        <p>
                            {carrito.producto[i] && carrito.producto[i].unidades}
                        </p>
                        <button className='p-1 border-2 border-gray-500 rounded-lg hover:bg-gray-400'
                        onClick={() => quitardelCarrito(producto._id)}>
                            Quitar del carrito
                        </button>
                    </div>
                ))): carga ? <Espera/> : <p>{verCarrito ? 'No hay productos' :''}</p>
                }
            </div>
            <Link to="/carrito" onClick={() => setverCarrito(false)} className='p-2 border-2 border-gray-500 rounded-lg hover:bg-gray-400'>
                Ver detalles del producto
            </Link>
        </div>
    )
}
CarritodeCompras.propTypes = {
    className: PropTypes.string,
    verCarrito: PropTypes.bool,
    setverCarrito: PropTypes.func
}
export default CarritodeCompras