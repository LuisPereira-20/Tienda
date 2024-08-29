import {Outlet, Navigate} from "react-router-dom";
import {useAutenticacion} from "../Authentication/Autenticacion.jsx";

const RutaAdmin = () => {
    const auth = useAutenticacion();

    return auth.isAdministrador ? <Outlet/> : <Navigate to="/perfil"/>;
}

export default RutaAdmin