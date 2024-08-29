import { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
import Enlace from "../assets/Backend.jsx";
import PropTypes from "prop-types";
import Espera from "../components/Espera.jsx";

const AutenticacionContext = createContext({
    isAuthenticated : false,
    isAdministrador : false,
    getAccessToken : () => {},
    guardarUsuario : () => {},
    cerrarSesion : () => {},
    Usuario : () => {},
    getRefreshToken : () => {}
});

const AutenticacionProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdministrador, setIsAdministrador] = useState(false);
    const [Usuario, setUsuario] = useState({});
    const [accessToken, setAccessToken] = useState("");
    const [espera, setEspera] = useState(true);

    const nuevoAccessToken = async (refrescarToken) => {
        try {
            const response = await axios.post(`${Enlace.backend}/refresh`, null,{
                headers : {
                    Authorization : `Bearer ${refrescarToken}`
                }
            });
            if (response.status === 200) {
                return response.data.accessToken;
            }
            else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const chequeoAdmin = async (Usuario, Token) => {
        try {
            const response = await axios.get(`${Enlace.backend}/rol/${Usuario.Rol}`, {
                headers : {
                    Authorization : `Bearer ${Token}`
                }
            });
            return response.data.docs.nombre === "Administrador";
        } catch (error) {
            console.log(error);
        }
    }
    const informacio_U = async (accessToken) => {
        try {
        const response = await axios.get(`${Enlace.backend}/perfil`, {
            headers : {
                Authorization : `Bearer ${accessToken}`
            }
        });
        if (response.status === 200) {
            const chequeo = await chequeoAdmin(response.data, accessToken);
            setIsAdministrador(chequeo);
            return response.data;
        }
        else {
            throw new Error(response.statusText);
        }
        } catch (error) {
            console.log(error);
        }
    }
    const chequeoauth = async () => {
        setEspera(true);
        if (accessToken) {
            const informacion = await informacio_U(accessToken);
            if (informacion) {
                guardarsession(accessToken, informacio_U, getRefreshToken());
            }
            else{
                const token = getRefreshToken();
                if (token) {
                    const newAccessToken = await nuevoAccessToken(token);
                    if (newAccessToken) {
                        const informacion = await informacio_U(newAccessToken);
                        if (informacion) {
                            guardarsession(newAccessToken, informacio_U, token);
                        }
                    }
                }
            }
            setEspera(false);
            return null
        }
    }
        const getAccessToken = () => {
            return accessToken;
        }
        const getRefreshToken = () => {
            const Tokendata = localStorage.getItem("Token");
            if (Tokendata) {
                const token = JSON.parse(Tokendata);
                return token;
            }
            return null;
        }
    const guardarsession = async (accessToken, informacion, token) => {
        setAccessToken(accessToken);
        localStorage.setItem("Token", JSON.stringify({refrescarToken}));
        setIsAuthenticated(true);
        setUsuario(informacion);
    }

    const guardarUsuario = (usuario) => {
        guardarsession(Usuario.usuario , usuario.accessToken, usuario.refrescartoken);
    }

    const obtenerUsuario = () => {
        return Usuario;
    }

    const cerrarSesion = async (refrescarToken) => {
        try{
            const response = await axios.delete(`${Enlace.backend}/logout`, {
              headers: {
                "Authorization": `Bearer ${refrescarToken}`
            }
            })
      
            if(response.status === 200) {
            localStorage.removeItem("Token");
            setIsAuthenticated(false);
            setAccessToken("");
            setUser({});
            }
          }catch(error){
            console.log(error);
          }
        }
    
        useEffect(() => {
            chequeoauth();
        }, []);

    return (
        <AutenticacionContext.Provider
            value={{
                isAuthenticated,
                isAdministrador,
                getAccessToken,
                guardarUsuario,
                cerrarSesion,
                obtenerUsuario,
                getRefreshToken
            }}
        >
            {Espera ? <Espera /> : children}
        </AutenticacionContext.Provider>
    );
};

AutenticacionProvider.propTypes = {
    children: PropTypes.node
};

export default AutenticacionProvider;

export const useAutenticacion = () => useContext(AutenticacionContext);
