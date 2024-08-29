import axios from "axios";
import PropTypes from 'prop-types';
import Enlace from "../assets/Backend";
import { useState, useEffect } from "react";
import { useAutenticacion } from "../Authentication/Autenticacion";

const ProductoCarrito = ({producto}) => {
    const Autenticacion = useAutenticacion();
    const [data , setData] = useState({});

    const getproducto = async () => {
        try {
                const response = await axios.get(`${Enlace.backend}"/productos/"${producto._id}`,{
                    headers: {
                        "rol": Autenticacion.Usuario().rol||"desconocido",
                    },
                    });
                setData(response.data.docs[0]);
            } catch (error) {
                console.log(error);
            }
        }

    useEffect(() => {
        getproducto();
    }, []);
    
    return (
        <>
            {data && 
            <div className={"rounded-xl p-2 flex flex-col items-center gap-4"}>
                {data.imagenes && <img className='h-64 w-64 object-cover rounded-xl' src={Enlace.backend + '/' + (data.imagenes[0] || 'No hay imagenes')} alt="" />}
                <div className="flex flex-col gap-2 w-64 md:w-96">
                    <h2 className='font-bold text-xl'>Nombre: <span className='font-normal'>{data.nombre}</span></h2>
                    <p className='font-bold text-md'>Descripción: <span className='font-normal'>{data.Descripcion}</span></p>
                    <p className='font-bold text-md'>Precio: <span className='font-normal'>${producto.precio}</span></p>
                    <p className='font-bold text-md'>Unidades: <span className='font-normal'>{producto.stock}</span></p>
                    <p>Total: <span className='font-normal'>${data.precio * producto.stock}</span></p>
                </div>
            </div>
            }
        </>
    )
}
ProductoCarrito.propTypes = {
    producto: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        stock: PropTypes.number.isRequired,
        precio: PropTypes.number.isRequired
    })
}
export default ProductoCarrito
