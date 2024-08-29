import axios from "axios";
import { useState } from "react";
import { useAutenticacion } from "../Authentication/Autenticacion";
import Enlace from "../assets/Backend";
import PropTypes from "prop-types";
import Espera from "./Espera.jsx";

const SubirProducto = () => {
    const Autenticacion = useAutenticacion();
    const[error, setError] = useState(null);
    const[seleccion, setSeleccion] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [subido , setSubido] = useState(false);
    const [cargando, setCargando] = useState(false);

    const seleccionarproductos = (event) => {
        const archivos = Array.from(event.target.files);
        setSeleccion(archivos);

        const filePreviews = files.map((archivo) => URL.createObjectURL(archivo));
        setPreviews(filePreviews);
    }

    const subir = async (event) => {
        window.scrollTo(0, 0);
        setError(null);
        setSubido(false);
        setCargando(true);
        event.preventDefault();
        const formData = new FormData();
        seleccion.forEach((file) => {
            formData.append("files", file);
        })
        if(seleccion.length === 0){
            setError("No se ha seleccionado ninguna imagen");
            setCargando(false);
            return;
        }
        if (seleccion.length > 5) {
            setCargando(false);
            setError("No se pueden subir más de 5 imagenes");
            return;
        }
        try {
            const response = await axios.patch(`${Enlace.backend}/productos/subir/img`, formData, { 
                headers: {
                    "Authorization": `Bearer ${Autenticacion.getAccessToken()}`,
                    "Content-Type": "multipart/form-data"
                },
            });
            setSubido(true);
            setCargando(false);
            setTimeout(() => {
                window.location.reload();
            }, 3001);
        } catch (error) {
            setError(error.response.data);
            setCargando(false);
        }
    }

    return (
        <form>
            {error && <p className="text-red-500">Error: {error.message || error}</p>}
            {subido && <p className="text-green-500">Subida exitosa</p>}
            <input  type="file" multiple onChange={seleccionarproductos} />
            <div className="flex gap-4">
                {previews.map((preview, index) => (
                    <img key={index} 
                    src={preview} 
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded"/>
                ))}
            </div>
            {seleccion.length > 0 && (
                <button type="submit" onClick={subir} className="bg-blue-400 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
                    Subir</button>
            )}
                {cargando && <Espera/>}
        </form>
    )
}

SubirProducto.propTypes = {
    id: PropTypes.string
}

export default SubirProducto
