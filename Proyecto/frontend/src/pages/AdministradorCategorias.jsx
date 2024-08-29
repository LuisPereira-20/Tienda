import { useState, useEffect } from "react";
import { useAutenticacion } from "../Authentication/Autenticacion";
import { Link } from "react-router-dom";
import Espera from "../components/Espera";
import Paginacion from "../components/Paginacion.jsx"
import Enlace from "../assets/Backend";
import axios from "axios";
import AdministradorCategoria from "../components/AdministradorCategoria.jsx"

const AdminCategoria = () =>{
    const [categorias, setCategorias] = useState([])
    const [nombre, setNombre] = useState("")
    const [cargando, setCargando] = useState(false)
    const [pagina, setPagina] = useState(1)
    const [opciones, setOpciones] = useState({})
    const [panel, setPanel] = useState(false)
    const [error, setError] = useState(null)
    const Autenticacion = useAutenticacion()

    const Enviar = async (e) => {
        e.preventDefault()
        setCargando(true)
        try {
            setError(null)
            const response = await axios.post (`${Enlace.backend}/Categorias`, {nombre}, {
                headers: {
                    "Authorization": `Bearer ${Autenticacion.getAccessToken()} `,
                    "rol": `${Autenticacion.Usuario().rol}`,
                },
            })
            if (response.status === 200){
                obtenerCategorias()
                setNombre("")
                setPanel(false)
            }
        }catch (error) {
            setError(`Error [${error.response.status}] : ${error.response.message}`)
            console.log(error)
        }
        setCargando(false)
    }
    const obtenerCategorias = async () => {
        try{
            setCargando(true)
            const {data} = await axios.get(`${Enlace.backend}/Categorias?sort=-FechaCreacion&Pagina=${pagina}`,{
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
            setCategorias(data.docs)
            setCargando(false)
        } catch {
            console.log(error)
        }
    }
    useEffect(() =>{
        window.scrollTo(0,0)
        obtenerCategorias()
    }, [pagina])
    return(
        <div>
            <h1>
                <Link to="/administrador">Volver</Link>
                Panel de Categorias 
            </h1>
            <div>
                <div>
                    <h2>Categorias</h2>
                    <button onClick={() => setPanel(!panel)}>Añadir Nueva</button>
                    {panel &&
                        <div>
                            <h1>Añadir Categoria</h1>
                            {error && <p>{error}</p>}
                            <input type="text" 
                            name="nombre" 
                            placeholder="Ingresa Nombre" 
                            onChange={(e) => setNombre(e.target.value)}
                            className="p-2 rounded-xl"/>
                            <div>
                                <button onClick={()=> setPanel(false)}>Cancelar</button>
                                <button onClick={Enviar}>Añadir</button>
                            </div>
                        </div>}
                </div>
                <div id="Categorias">
                    {categorias && categorias.map((categorias) =>(
                        <AdministradorCategoria key={categorias._id} categoria={categorias}/>
                    ))}
                    {cargando && <Espera/>}
                </div>
                <Paginacion opciones={opciones} page={pagina} setPage={setPagina}/>
            </div>
        </div>
    )
}

export default AdminCategoria