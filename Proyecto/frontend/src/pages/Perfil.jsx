import { useAutenticacion } from "../Authentication/Autenticacion";
import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Enlace from "../assets/Backend";
import Espera from "../components/Espera";
import Compras from "../components/Compras";
import Fecha from "../assets/FormatoFecha";
import Paginacion from "../components/Paginacion";


const Perfil = () => {
    const Autenticacion = useAutenticacion();
    const usuario = Autenticacion.Usuario();
    const [orders, setOrders] = useState([]);
    const [loader, setLoader] = useState(true);
    const [page, setPage] = useState(1);
    const [options, setOptions] = useState({});

    const getpedidos = async () => {
        try {
          setLoader(true);
          const response = await axios.get(`${url.backend}/purchases/user/${user._id}?page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${auth.getAccessToken()}`
              }
            }
          );
          setLoader(false);
          setOrders(response.data.docs);
          setOptions({
            totalDocs: response.data.totalDocs,
            totalPages: response.data.totalPages,
            page: response.data.page,
            hasPrevPage: response.data.hasPrevPage,
            hasNextPage: response.data.hasNextPage,
            prevPage: response.data.prevPage,
            nextPage: response.data.nextPage
          })
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(() => {
        window.scrollTo(0, 0);
        if(Autenticacion.isAuthenticated){
          getpedidos();}
      }, [page]);

      if(!Autenticacion.isAuthenticated){
        return <Navigate to="/" />
      }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center items-center p-8 gap-8">
          <h1 className="text-3xl font-bold md:col-span-2">Mi Perfil</h1>
          <div className="flex flex-col justify-center items-center">
            <div className=" rounded-full">
              <img className="h-40 w-40 md:h-60 md:w-60 object-cover rounded-full hover:scale-[1.5] transition-transform duration-300" src={Enlace.backend+"/"+(usuario.imagen?usuario.imagen:"No hay imagen")} alt={usuario.nombre+" profile picture"} />
            </div>
            <h2 className="text-2xl">{usuario.nombre} {usuario.apellido}</h2>
            <p>Se registro: {Fecha(usuario.FechaCreacion)}</p>
          </div>
          <div className="flex flex-col md:row-span-2 w-full gap-4 justify-center items-center">
            <h2 className="text-3xl font-bold">Historial de compras</h2>
            <div className={"relative min-h-64 min-w-64 max-h-96 lg:w-2/3 grid border-2 border-n5 overflow-y-auto bg-n1 px-4 py-2 rounded-lg gap-4"}>
              {orders.length > 0 && !loader && orders.map((order) => <Compras key={Compras._id} purchase={Compras} />)}
              {orders.length === 0 && !loader && <p className="place-self-center">No ha realizado compras</p>}
              {loader && <Espera />}
            </div>
            {orders.length != 0 && <Paginacion options={options} page={page} setPage={setPage} />}
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <h2 className="text-3xl font-bold">Account Settings</h2>
            <div className="flex justify-center items-center gap-2 p-4">
              <Link to="/profile/edit">
                <img className="min-h-16 min-w-16 bg-white p-4 rounded-2xl" src="/svg/account.svg" alt="account" />
              </Link>
              <span className="text-xl p-4">Profile Information</span>
              <Link className="p-2" to="/profile/edit">
                <img src="/svg/rightArrow.svg" alt="" />
              </Link>
            </div>
          </div>
          <button className="text-2xl bg-red-500 rounded-2xl px-4 py-2 hover:text-n1 transition duration-300 hover:scale-105 " onClick={async () => auth.logout(auth.getRefreshToken())}>Log Out</button>
        </div>
      )
    }
    
    export default Perfil
