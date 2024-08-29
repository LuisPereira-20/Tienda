import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAutenticacion } from "../Authentication/Autenticacion";
import { useCarrito } from "../components/Carritoprovider";
import Espera from "../components/Espera";
import Enlace from "../assets/Backend";
import axios from "axios";
import ImagenSeleccion from "../components/ImagenSeleccion";


const Producto = () => {
    const Autenticacion = useAutenticacion();
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    const { añadirAlCarrito } = useCarrito();

    const getData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${url.backend}/product/${id}`,
            {
              headers: {
                "role": Autenticacion.Usuario().role || "unknown",
              }
            }
          );
          setProduct(response.data.docs[0]);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

      const agregar = () => {
        añadirAlCarrito({
            _id: product._id,
            quantity: quantity,
        })
        setQuantity(1)
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getData();
    }, []);

    return (
        <div className=" min-h-[85vh]">
          <div className=" min-h-[85vh] p-4 flex flex-col items-center justify-center">
            {loading ? <Espera /> :<div className="grid w-full md:grid-cols-2 justify-items-center gap-4  rounded-xl p-4 relative">
              <Link to="/home" className="place-self-start absolute top-4 left-4 text-n2 hover:scale-110 p-2 rounded-xl">
                Volver
              </Link>
              {product.images && <ImagenSeleccion images={product.imagen} className="h-96 w-full rounded-xl" />}
              <div className="flex flex-col md:justify-center gap-4 md:gap-8 p-2">
                <h1 className="text-3xl">{product.name}</h1>
                <p className="text-md">Descripcion: {product.description}</p>
                <div>
                  {product.discount > 0 && <p className="text-md line-through">Precio original: ${(product.price).toFixed(2)}</p>}
                  <p className="text-lg font-bold flex gap-4 items-center">Precio: ${(product.price * (1 - product.discount / 100)).toFixed(2)} {product.discount > 0 && <span className="text-n1 text-sm bg-n5 py-1 px-2 rounded-xl">-{product.discount}%</span>} </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-md">Stock: {product.quantity} {product.quantity === 1 ? "item" : "items"}</p>
                  {product.quantity === 1 && <p className="text-md bg-n5 text-n2 p-1 rounded-xl py-2 px-4">Only {product.quantity} left!</p>}
                </div>
                {product.quantity === 0 && <p className="text-md text-red-500">Out of stock</p>}
                <div className="flex items-center w-full gap-4 justify-end">
                  <button disabled={quantity === 1} className={"h-8 w-8 rounded-full" + (product.quantity === 1 ? " cursor-not-allowed opacity-50" : "")} onClick={() => {if(quantity > 1)setQuantity(quantity - 1)}}>-</button>
                  <input disabled={product.quantity === 0} type="number" min="1" max={product.quantity} step="1" placeholder="Cantidad" onChange={(e) => setQuantity(e.target.value)} value={quantity} className={"p-2 rounded-xl w-fit text-center" + (product.quantity === 0 ? " cursor-not-allowed opacity-50" : "")} />
                  <button disabled={quantity === product.quantity} className={" h-8 w-8 rounded-full" + (product.quantity === quantity ? " cursor-not-allowed opacity-50" : "")} onClick={() => {if(quantity < product.quantity)setQuantity(quantity + 1)}}>+</button>
                  <button disabled={product.quantity === 0} className={" p-2 rounded-xl" + (product.quantity === 0 ? " cursor-not-allowed opacity-50" : "")} onClick={agregar}>Añadir al carrito</button>
                </div>
              </div>
            </div>}
          </div>
        </div>
      )
    }

    export default Producto
