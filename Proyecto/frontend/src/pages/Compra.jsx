import { useState, useEffect } from "react";
import { useAutenticacion } from "../Authentication/Autenticacion";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Enlace from "../assets/Backend";
import axios from "axios";
import ProductoCarrito from "../components/ProductoCarrito";
import { get } from "mongoose";


const Compra = () => {
    const { id } = useParams();
  const [order, setOrder] = useState({});
  const goTo = useNavigate();
  const Autenticacion = useAutenticacion();

  const getOrder = async () => {
    try {
      const response = await axios.get(`${url.backend}/purchases/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${auth.getAccessToken()}`
          },
        }
      );
      setOrder(response.data.docs[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!Autenticacion.isAuthenticated()) {
        getOrder();
    }
  }, []);
  if (!Autenticacion.isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col justify-center items-center p-8 gap-8">
      <h1 className="text-lg">Compra ID: {id}</h1>
      <h2 className="text-lg">Detalles de la compra</h2>
      <h2 className="text-lg">Creada: {new Date(Compra.FechaCreacion).toLocaleString()}</h2>
      <div className="flex flex-col justify-center items-center gap-4">
        {Object.keys(Compra).length && order.products.map((producto) => (
          <ProductOrderCart key={producto._id} producto={producto} />
        ))}
      </div>
      <h2 className="text-2xl">Total: ${Compra.total}</h2>
      <button className="bg-blue-400 text-white p-4 rounded-xl " onClick={() => goTo("/profile")}>ver perfil</button>
    </div>
  )
}

export default Compra