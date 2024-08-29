import { useEffect, useState } from "react";
import { useAutenticacion } from "../Authentication/Autenticacion";
import { Link } from "react-router-dom";
import Espera from "../components/Espera";
import Enlace from "../assets/Backend.jsx";
import axios from "axios";
import AdministradorCompras from "../components/AdministradorCompras.jsx"
import Paginacion from "../components/Paginacion.jsx"


const AdminCompras = () =>{
    const [compras, setCompras] = useState([])
    const [cargando, setCargando] = useState(false)
    const [pagina, setPagina] = useState(1)
    const [opciones, setOpciones] = useState({})
    const Autenticacion = useAutenticacion()

    const obtenerCompras = async () => {
        try{
            setCargando(true)
            const {data} = await axios.get(`${Enlace.backend}/Compras?Pagina=${pagina}&sort=Eliminado,-FechaCreacion`,{
                headers: {
                    "Authorization": `Bearer ${Autenticacion.getAccessToken()}`,
                    "rol": `${Autenticacion.Usuario().rol}`,
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
            setCompras(data.docs)
            setCargando(false)
        }catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        obtenerCompras()
    }, [pagina])

    return (
        <div>
            <h1>
                <Link to="/Administrador" className="cursor-pointer">Volver</Link>
                Panel de Compras
            </h1>
            <div>
                <h2>Compras</h2>
                <div>
                    {compras && compras.map((compras) => (
                        <AdministradorCompras
                            key={compras._id}
                            compras={compras}
                        />
                    ))}
                    {cargando && <Espera />}
                </div>
                <Paginacion
                    pagina={pagina}
                    setPagina={setPagina}
                    opciones={opciones}
                />
            </div>
        </div>
    )
}

export default AdminCompras