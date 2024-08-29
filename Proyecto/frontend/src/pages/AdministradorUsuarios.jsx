import { useState, useEffect } from "react";
import { useAutenticacion } from "../Authentication/Autenticacion";
import { Link } from "react-router-dom";
import Espera from "../components/Espera";
import Enlace from "../assets/Backend.jsx";
import axios from "axios";
import AdministradorUsuario from "../components/AdministradorUsuario.jsx"
import Paginacion from "../components/Paginacion.jsx"
import AñadirNuevo from "../components/AñadirNuevo.jsx"


const AdminUsuarios = () =>{
    const [usuarios, setUsuarios] = useState([])
    const [cargando, setCargando] = useState(false)
    const [pagina, setPagina] = useState(1)
    const [opciones, setOpciones] = useState({})
    const Autenticacion = useAutenticacion()

    const obtenerUsuarios = async () => {
        try{
            setCargando(true)
            const {data} = await axios.get(`${Enlace.backend}/Usuarios?Pagina=${pagina}&sort=Eliminado`,{
                headers: {
                    "Authorization": `Bearer ${Autenticacion.getAccessToken()}`,
                    "rol": Autenticacion.Usuario().rol || "Invitado",   
                },
            })
            setOpciones ({
                totalDocs: data.totalDocs,
                totalPages: data.totalPages,
                nextPage: data.nextPage,
                prevPage: data.prevPage,
                hasnextPage: data.hasnextPage,
                hasprevPage: data.hasprevPage,
            })
            setUsuarios(data.docs)
            setCargando(false)
        }catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        obtenerUsuarios()
    }, [pagina])

    return (
        <div>
            <h1>
                <Link to="/Administrador" className="cursor-pointer">Volver</Link>
                Panel de Usuarios
            </h1>
            <div>
                <div>
                <h2>Usuarios</h2>
                <AñadirNuevo type="usuario"/>
                </div>
                <div>
                    {usuarios && usuarios.map((usuario) => (
                        <AdministradorUsuario key={usuario._id} usuario={usuario} />
                    ))}
                    {cargando && <Espera/>}
                </div>
                <Paginacion
                    opciones={opciones}
                    pagina={pagina}
                    setPagina={setPagina}
                />
            </div>
        </div>
    )

}

export default AdminUsuarios
