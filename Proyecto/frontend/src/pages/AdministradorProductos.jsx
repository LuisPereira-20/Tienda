import { useState, useEffect } from "react";
import { useAutenticacion } from "../Authentication/Autenticacion";
import { Link } from "react-router-dom";
import Espera from "../components/Espera";
import Enlace from "../assets/Backend.jsx";
import axios from "axios";
import AdministradorProducto from "../components/AdministradorProducto.jsx"
import Paginacion from "../components/Paginacion.jsx"
import AñadirNuevo from "../components/AñadirNuevo.jsx"


const AdminProductos = () =>{
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(false)
    const [pagina, setPagina] = useState(1)
    const [opciones, setOpciones] = useState({})
    const Autenticacion = useAutenticacion()

    const obtenerProductos = async () => {
        try{
            setCargando(true)
            const {data} = await axios.get(`${Enlace.backend}/Productos?Pagina=${pagina}&sort=Eliminado`,{
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
            setProductos(data.docs)
            setCargando(false)
        }catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        obtenerProductos()
    }, [pagina])

    return (
        <div>
            <h1>
                <Link to="/Administrador" className="cursor-pointer">Volver</Link>
                Panel de Productos
            </h1>
            <div>
                <div>
                <h2>Productos</h2>
                <AñadirNuevo type="producto"/>
                </div>
                <div>
                    {productos && productos.map((producto) => (
                        <AdministradorProducto
                            key={producto._id}
                            producto={producto}
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

export default AdminProductos