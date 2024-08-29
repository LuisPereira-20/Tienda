import PropTypes from 'prop-types';
import {useAutenticacion} from "../Authentication/Autenticacion.jsx";
import { useEffect, useState } from 'react';
import Fecha from '../assets/FormatoFecha.jsx';
import Espera from './Espera.jsx';
import Enlace from '../assets/Backend.jsx';
import axios from "axios";

const AdministradorCategoria = ({Categoria}) => {
    const Auth = useAutenticacion();
    const [Nombre, setNombre] = useState(Categoria.nombre);
    const [Eliminado, setEliminado] = useState(Categoria.eliminado);
    const [tiempo, setTiempo] = useState(false);
    const [error, setError] = useState(null);
    const HandleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    const HandleSubmit = async () => {
        try {
            setTiempo(true);
            setError(null);
            const response = await axios.patch(`${Enlace.backend}/categorias/${Categoria._id}`, { Nombre, Eliminado }, 
            {
                headers : {
                    "Authorization":`Bearer ${Auth.getAccessToken()}`,
                    "Rol": Auth.Usuario().rol
                }
            });
            if (response.status === 200) {
                console.log("CATEGORIA ACTUALIZADA");
            } 
        } catch (error) {
            setError(`Error: [${error.response.status}] ${error.response.data.message}`);
            console.log(error);
            }
            setTiempo(false);
    };
    useEffect(() => {
        setNombre(Categoria.nombre);
    }, [Categoria]);
        

    return (
        <div className={"flex flex-col gap-4 text-center justify-center items-center p-4"}>
            <p onClick={() => HandleCopy(Categoria._id)} className={'flex justify-center items-center gap-2 cursor-pointer'} title='Copiar ID'>ID: {Categoria._id}</p>
            {error && <p className="text-red-500">{error}</p>}
            {tiempo ? <Espera/> : <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 justify-center items-center">
                <label>Nombre:
                    <input type="text" 
                    name='Nombre' 
                    value={Nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    className='border border-gray-400 rounded-lg py-2 px-4 w-32 text-gray-600 shadow-sm text-center' placeholder='Nombre'/>
                </label>
                <label>Activa:
                    <input type="checkbox"
                    name='Eliminado'
                    checked={!Eliminado}
                    onChange={(e) => setEliminado(e.target.checked)}
                    className='w-4 h-4' placeholder='Nombre'/>
                </label>
                <button disabled = {Nombre === Categoria.nombre && Eliminado === Categoria.eliminado} 
                title={Nombre === Categoria.nombre && Eliminado === Categoria.eliminado ? 'No hay cambios' : 'Editar'} 
                onClick={() => HandleSubmit()} 
                className={"w-20 p-2 rounded-xl bg-blue-400 hover:bg-blue-600 hover:scale-110" + (Nombre === Categoria.nombre && Eliminado === Categoria.eliminado ? ' scale-100 opacity-70 cursor-not-allowed' : ' scale-110')} 
                type='submit'>Actualizar</button>
                <div className="flex flex-col gap-2 justify-center items-center">
                    <p className='text-sm'>Creado: {Fecha(Categoria.FechaCreacion)}</p>
                    <p className='text-sm'>Actualizado: {Categoria.FechaActualizacion ? Fecha(Categoria.FechaActualizacion): 'Nunca'}</p>
                    <p className='text-sm'>Eliminado: {Categoria.FechaEliminacion ? Fecha(Categoria.FechaEliminacion) : 'Nunca'}</p>
                </div>
            </form>
            }
        </div>
    )
}
AdministradorCategoria.propTypes = {
    Categoria: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        eliminado: PropTypes.bool,
        FechaCreacion: PropTypes.string.isRequired,
        FechaActualizacion: PropTypes.string,
        FechaEliminacion: PropTypes.string
    })
}
export default AdministradorCategoria