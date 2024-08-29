import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAutenticacion } from "../Authentication/Autenticacion";
import { useCarrito } from "../components/Carritoprovider";
import { Link } from "react-router-dom";
import Espera from "../components/Espera";
import Enlace from "../assets/Backend.jsx";
import axios from "axios";


const Carrito = () => {
    const Autenticacion = useAutenticacion();
    const {carrito, vaciarCarrito, añadirAlCarrito, quitardelCarrito} = useCarrito();
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(false)
    const [total, subTotal] = useState(0)
    const [error, setError] = useState("")
    const [agregado, setAgregado] = useState(false)
    const [data, setData] = useState([])

    const obtenerProducto = async () => {
        try{
            const {response} = await axios.get(`${Enlace.backend}/Carrito/${producto._id}`, {
                headers: {
                    "rol": Autenticacion.Usuario().rol || "Invitado",
                }
            });
            return response.data.docs[0];
        } catch (error) {
            console.log(error);
        }
    } 
    const obtenerProductos = async () => {
        setCargando(true)
        try{
            const {data} = await Promise.all(carrito.producto.map (async (producto) => await obtenerProducto(producto)))
            setData(data);
            subTotal(getTotal(data));
        } catch (error) {
            console.log(error);
        }
        setCargando(false)
    }
    getTotal = (producto) => {
        let total = 0
        for(let i = 0; i < carrito.producto.length; i++){
            total += carrito.producto[i].unidades  * (producto.producto[i].precios * (1 - (producto[i].descuento /100)));
        }
        return total
    }

    const item = (id, n, limite, unidades) => {
        if (unidades < limite) 
            return;
            añadirAlCarrito({_id: id, unidades: n});
        }
        const quitar = (producto) => {
            quitardelCarrito(producto._id);
        }

        const comprar = async () => {
            window.scrollTo(0, 0);
            setAgregado(false);
            setCargando(true);
            if(!Autenticacion.isAuthenticated()){
                navigate("/Login");
            }
            try{
                setError("");
                console.log(carrito.Usuario, carrito.producto);
                const {data} = await axios.post(`${Enlace.backend}/Compras`, {
                    Usuario: carrito.Usuario,
                    Productos: carrito.producto
                }, {
                    headers: {
                        "Authorization": `Bearer ${Autenticacion.getAccessToken()}`,
                    }
                });
                if(data.status === 200){
                setAgregado(true);
                vaciarCarrito();
                setTimeout(() => {
                    navigate("/Compras");
                }, 3001);
                }
            } catch (error) {
                console.log(error);
                setError(error.response.data.message);
            }
            setCargando(false);
} 

    useEffect(() => {
        obtenerProductos();
    }, [carrito]);

    return (
        <>
        { !agregado &&
            <div> 
                <h1>Carrito</h1>
                {error && <p>Error: {error}</p>}
                <div>
                    {!cargando && data && data.length > 0 ? (
                        data.map((producto, i) => (
                            <div key={producto._id}>
                                <h2>{producto.nombre}</h2>
                                <div>
                                    <img src={Enlace.backend +"/" + producto.imagenes[0]} alt="" />
                                    {carrito.producto[i] &&
                                        <div>
                                            <button onClick={() => item(producto._id, -1, producto.unidades, carrito.productos[i].unidades)}>-</button>
                                            <p className="font-bold text-md px-4 py-1 rounded-lg">{carrito.productos[i].unidades}</p>
                                            <button onClick={() => item(producto._id, 1, producto.unidades, carrito.productos[i].unidades)}>+</button>
                                        </div>
                                    }
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="font-bold text-sm">Cada uno</h3>
                                        <div className="flex gap-1">
                                            <p className="text-lg font-bold">${(producto.price * (1 - (producto.descuento / 100))).toFixed(2)}</p>
                                            {producto.descuento > 0 && <p className="text-xs line-through">${producto.precio.toFixed(2)}</p>}
                                        </div>
                                    </div>
                                    { cart.products[i] &&
                                        <div className="flex flex-col gap-1">
                                            <h3>Total</h3>
                                            <p>${(carrito.producto[i].unidades * (producto.price * (1 - (producto.descuento / 100)))).toFixed(2)}</p>
                                        </div>
                                    }
                                    <button onClick={() => quitar(producto)}>Quitar</button>
                                </div>
                        ))
                    ) : (
                        cargando ? <Espera /> :
                        <div>
                            <h2>No hay productos en el carrito</h2>
                            <Link to="/Home">Empieza a comprar ahora</Link>
                        </div>
                )}
                    </div>
                    {data.length > 0 && !loader &&
                        <div className="flex flex-col gap-2">
                        <h3 className="text-3xl font-bold">
                            Total: ${total.toFixed(2)}
                        </h3>
                        <button onClick={comprar}>Comprar</button>
                        </div>
                    }
                    </div>
                }
                    { agregado &&
                        <div className="grid justify-items-center min-h-[85vh] p-8">
                        <h1 className="text-xl place-self-center">¡Gracias por tu compra.</h1>
                        <div className="flex flex-col gap-2 items-center">
                        <h2 className="text-lg">Deseas regresar a la tienda</h2>
                        <h2 className="text-lg flex items-center gap-2">Desas recibir un correo con datos de tu pedido<img className="w-6 h-6" src="/svg/mail.svg" alt="" /></h2>
                        </div>
                        <Espera/>
                </div>
                    }
    </>
    )
}
export default Carrito