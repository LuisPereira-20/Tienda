import { useState, useEffect } from "react";
import { useAutenticacion } from "../Authentication/Autenticacion";
import { useParams, Link } from "react-router-dom";
import Enlace from "../assets/Backend";
import axios from "axios";
import ProductoCarrito from "../components/ProductoCarrito";


const VerCompra = () => {

    const Autenticacion = useAutenticacion();
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [user, setUser] = useState({});

    const getcompra = async () => {
        try {
            const response = await axios.get(`${url.backend}/purchases/${id}`,
              {
                headers: {
                  "Authorization": `Bearer ${auth.getAccessToken()}`
                },
              }
            );
            setOrder(response.data.docs[0]);
            getUsuario(response.data.docs[0].user);
          } catch (error) {
            console.log(error);
          }
        }

    const getUsuario = async (id) => {
        try {
            const response = await axios.get(`${url.backend}/users/${id}`,
              {
                headers: {
                  "Authorization": `Bearer ${auth.getAccessToken()}`
                },
              }
            );
            setUser(response.data.docs[0]);
            console.log(response.data.docs[0]);
          } catch (error) {
            console.log(error);
          }
        }

    useEffect(() => {
        window.scrollTo(0, 0);
        getcompra();
    }, []);
    return (
        <div className="grid grid-cols-1 justify-items-center p-4 gap-4">
      <h1 className="text-2xl flex gap-2 items-center">
        <Link to="/admin/orders"><img className="h-6 w-6" src="/svg/leftArrow.svg" alt="Go Back" /></Link>
        Ver detalles de la Compra
      </h1>
      <h2 className="text-lg">Compra ID: {id}</h2>
      {user &&
      <div className={"p-4 gap-y-4 grid justify-items-center align-content-center md:grid-cols-2 rounded-xl shadow-lg bg-n2"}>
        <img className="h-40 w-40 col-span-2 md:col-span-1 object-cover rounded-full place-self-center shadow-xl" src={Enlace.backend +"/"+ (user.imagen ? user.imagen : "uploads/JoneDoe.png")} alt="Order" />
        <div className="flex flex-col justify-center gap-2">
          <h2 className="flex flex-col text-lg">Compra hecha por:
            <span className="text-md">{user.nombre} {user.apellido}.</span>
          </h2>
          <h2 className="text-lg flex flex-col">
            Email:
            <span className="text-md">{user.email}</span>
          </h2>
        </div>
        <Link to={`/admin/users/${user._id}`} className={"col-span-2 hover:scale-105 transition duration-300  bg-n5 text-n1 px-6 py-1 hover:bg-n2 hover:text-n5 rounded-full"}>View Profile</Link>
      </div>
      }
      <h2 className="text-lg">Creado: {new Date(compra.FechaCreacion).toLocaleString()}</h2>
      <div className="flex flex-col justify-center items-center gap-2 shadow-lg">
        {Object.keys(compra).length && order.products.map((producto) => (
          <ProductoCarrito key={producto._id} product={producto} />
        ))}
      </div>
      <h2 className="text-2xl">Total: ${compra.total}</h2>
    </div>
  )
}

export default VerCompra
