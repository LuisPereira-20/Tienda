import Enlace from "../assets/Backend";
import axios from "axios";
import Espera from "../components/Espera";
import ImagenSeleccion from "../components/ImagenSeleccion";
import SubirProducto from "../components/SubirProducto";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAutenticacion } from "../Authentication/Autenticacion";


const ProductoImagen = () => {
    const Autenticacion = useAutenticacion();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState({});

    const getProduct = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(`${url.backend}/product/${id}`, {
            headers: {
              "Authorization": `Bearer ${Autenticacion.getAccessToken()}`,
              "role": Autenticacion.Usuario().role || "unknown",
            },
          });
          console.log(response.data.docs[0]);
          setProduct(response.data.docs[0]);
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
        setLoading(false);
      }
    
      useEffect(() => {
        getProduct();
      }, []);
    
      return (
        <div className="w-full min-h-[85vh] flex flex-col p-8 items-center gap-8">
        <h1 className="text-3xl">Imagen del producto</h1>
        {error && <p className="text-red-500">Error: {error}</p>}
        {loading && <Espera />}
        {product && (
          <>
            {product.images && <ImagenSeleccion images={product.images} />}
            <SubirProducto id={id} />
            <div className="grid grid-cols-2 gap-4">
              <Link to={`/admin/products/${product._id}`} className={"text-center bg-n5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"}>
                omitir por ahora
              </Link>
              <Link to={`/admin/products/${product._id}`} className={"text-center bg-n4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"}>
                Guardar
              </Link>
            </div>
          </>
        )}
      </div>
    );
  };

export default ProductoImagen