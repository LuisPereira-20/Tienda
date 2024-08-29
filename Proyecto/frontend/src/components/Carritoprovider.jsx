import { useContext, useState, useEffect, createContext  } from "react";
import {useAutenticacion} from "../Authentication/Autenticacion.jsx";
import PropTypes from "prop-types";
import producto from "../../../backend/Model/Modelo_producto.js";

const CarritoContext = createContext({
    carrito : [],
    añadirAlCarrito : () => {},
    quitardelCarrito : () => {},
    vaciarCarrito : () => {},
    añadirUsuario : () => {},
});

const CarritoProvider = ({children}) => {
    const autenticacion = useAutenticacion();
    const [carrito, setCarrito] = useState(localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : {Usuario: (autenticacion.isAuthenticated ? autenticacion.Usuario ()._id : null), productos: []});

    const añadirUsuario = (id) => {
        setCarrito({...carrito, Usuario: id});
    }

    const añadirAlCarrito = (item) => {
        if (autenticacion.isAuthenticated) {
            añadirUsuario(autenticacion.Usuario()._id);
        }

    const itemirrepetible = carrito.productos.find(producto => producto._id === item._id)

    if (itemirrepetible) {
        const nuevocarrito = {...carrito}
        const indice = nuevocarrito.productos.findIndex(producto => producto._id === item._id)
        nuevocarrito.productos[indice].unidades += item.unidades
        setCarrito(nuevocarrito)
    } else {
        const nuevocarrito = {...carrito}
        nuevocarrito.productos.push({_id: item._id, unidades: item.unidades})
        setCarrito(nuevocarrito)
    }
    }
    const quitardelCarrito = (id) => {
        const nuevo_carrito = {...carrito}
        const indice = nuevo_carrito.productos.findIndex(producto => producto._id === id)
        nuevo_carrito.productos.splice(indice, 1)
        setCarrito(nuevo_carrito)
    }

    const vaciarCarrito = () => {
        setCarrito({Usuario: null, productos: []})
    }

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }, [carrito])

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                añadirAlCarrito,
                quitardelCarrito,
                vaciarCarrito,
                añadirUsuario
            }}
        >
            {children}
        </CarritoContext.Provider>
    )
}

CarritoProvider.propTypes = {
    children: PropTypes.node
};

export default CarritoProvider

export const useCarrito = () => useContext(CarritoContext)
