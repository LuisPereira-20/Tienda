import Producto from "../components/Producto.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Enlace from "../assets/Backend.jsx";


const Home = () => {
    const [productos, setProductos] = useState([]);
    const getproductos = async () => {
        try {
            const response = await axios.get(`${Enlace.backend}/productos`);
            setProductos(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getproductos();
    }, []);

    return (
        <>
        <div className="flex flex-col items-center justify-center text-center bg-blue-400 lg:grid-cols-3 gap-8">
            <span className="font-bold text-lg lg:text-3xl lg:flex lg:gap-8">
                <h1>FarmamigoIV</h1>
            </span>
            <span className="font-bold text-lg lg:text-3xl lg:flex lg:gap-8">
                El aliado de tu salud
            </span>
        </div>
        <div className="flex flex-col items-center justify-center">
            <h2>Te puede interesar</h2>
            <div id="Destacados" className="flex flex-col items-center justify-center gap-8 lg:grid-cols-4 md:grid md:grid-cols-2">
                {productos && productos.map((producto) => (<Producto key={producto._id} producto={producto}/>))}
            </div>
        </div>
        <div className="flex flex-col items-center justify-center">
            <h2>Categorias</h2>
            <div className="grid grid-cols-2 gap-8 justify-items-center lg:grid-cols-4">
                <Link to="/categorias/Antialergicos" className="text-xl p-4 rounded-xl hover:bg-gray-400">Antialergicos</Link>
                <Link to="/categorias/Analgesicos" className="text-xl p-4 rounded-xl hover:bg-gray-400">Analgesicos</Link>
                <Link to="/categorias/Ansioliticos" className="text-xl p-4 rounded-xl hover:bg-gray-400">Ansioliticos</Link>
                <Link to="/categorias/Antibioticos" className="text-xl p-4 rounded-xl hover:bg-gray-400">Antibioticos</Link>
            </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 p-8">
            <h2>Acceder</h2>
            <div className="grid grid-cols-2 gap-8 justify-items-center lg:grid-cols-3">
                <Link to="/login" className="flex justify-star gap-4"><span className="text-xl font-bold">Iniciar sesion</span></Link>
                <Link to="/perfil" className="flex justify-star gap-4"><span className="text-xl font-bold">Mi perfil</span></Link>
                <Link to="/perfil" className="flex justify-star gap-4"><span className="text-xl font-bold">Mis compras</span></Link>
            </div>
        </div>
        
        </>
    )
}

export default Home