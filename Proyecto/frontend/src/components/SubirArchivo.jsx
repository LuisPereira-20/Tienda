import axios from "axios";
import { useState } from "react";
import Enlace from "../assets/Backend.jsx";
import { useAutenticacion } from "../Authentication/Autenticacion.jsx";
import PropTypes from "prop-types";

const SubirArchivo = ({ id }) => {
    const autenticacion = useAutenticacion();
    const [archivo, setArchivo] = useState(null);
    const [subiendo, setSubiendo] = useState(false);
    const [previo, setPrevio] = useState(null);
    const [error, setError] = useState(null);

const archivoSelect = (event) => {
    const file = event.target.files[0];
    setArchivo(file);
    setPrevio(URL.createObjectURL(file));
};

const subirArchivo = async () => {
    setError(null);
    setSubiendo(false);
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", archivo);
    try {
        const response = await axios.post(`${Enlace.backend}/usuarios/subir/img/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data", 
                "Authorization": `Bearer ${autenticacion.getAccessToken()}`,
                
            }
        });
            setSubiendo(true);
            console.log(response.data);
            setTimeout(() => {
                window.location.reload();
            }, 3001);
            } catch (error) {
                setError(error.response.data);
                console.log(error);
            }
    };

    return (
        <form className="flex flex-col items-center justify-center gap-4" onSubmit={subirArchivo}>
            <input 
            className="p-2 rounded-lg" 
            type="file" 
            onChange={archivoSelect} />
            {previo && <img src = {previo} 
            alt = "previo" 
            className = "w-1/3 h-1/3 object-cover rounded"/>}
            {archivo && <button type="submit" className="bg-blue-400 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded w-30">Subir archivo</button>}
            {subiendo && <p>El archivo se ha subido correctamente</p>}
            {error && <p> Error: {error.message}</p>}
        </form>
            )
        };
SubirArchivo.propTypes = {
    id: PropTypes.string
}
export default SubirArchivo
