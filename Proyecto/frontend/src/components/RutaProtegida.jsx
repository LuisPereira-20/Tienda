import {Outlet, Navigate} from 'react-router-dom';
import {useAutenticacion} from "../Authentication/Autenticacion.jsx";

const RutaProtegida = () => {
    const autenticacion = useAutenticacion();
    return autenticacion.isAuthenticated ? <Outlet/> : <Navigate to="/login" />
}

export default RutaProtegida