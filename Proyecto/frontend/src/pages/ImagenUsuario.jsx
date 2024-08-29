import Enlace from "../assets/Backend";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAutenticacion } from "../Authentication/Autenticacion";
import { useParams, Link } from "react-router-dom";
import Espera from "../components/Espera";
import SubirArchivo from "../components/SubirArchivo";


const ImagenUsuario = () => {

    const Autenticacion = useAutenticacion();
    const [user, setUser] = useState({});
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUser = async () => { 
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(`${url.backend}/users/${id}`, {
            headers: {
              "Authorization": `Bearer ${Autenticacion.getAccessToken()}`
            },
          });
          console.log(response.data.docs[0]);
          setUser(response.data.docs[0]);
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
        setLoading(false);
      }
      useEffect(() => {
        getUser();
      }, []);
      return (
        <div className="w-full min-h-[85vh] flex flex-col p-8 items-center gap-8">
      <h1 className="text-xl"> Imagen de Perfil</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      {loading && <Espera />}
      {user && (
        <>
          <img className="w-64 h-64 rounded-full" src={Enlace.backend + "/" + (user.image ? user.image : "No hay imagen")}
          alt="User Image"
          />
          <SubirArchivo id={id} />
          <div className="grid grid-cols-2 gap-4">
            <Link to={`/admin/users/${user._id}`} className={"text-center bg-n5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"}>
              Omitir por ahora
            </Link>
            <Link to={`/admin/users/${user._id}`} className={"text-center bg-n4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"}>
              Guardar
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ImagenUsuario;