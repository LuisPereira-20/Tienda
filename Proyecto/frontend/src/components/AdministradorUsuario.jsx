import Enlace from "../assets/Backend";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

const copia = (text) => {
    navigator.clipboard.writeText(text);
}

const AdministradorUsuario = ({usuario}) => {
    return (
        <div className={"flex flex-col items-center justify-center gap-4"}>
            <p onClick={() => copia(usuario._id)} 
            className="cursor-pointer flex p-2 items-center ">ID: {usuario._id}</p>
            <img className='h-64 w-64 object-cover rounded-full'
                src={Enlace.backend + '/' + (usuario.Imagen[0] ? usuario.Imagen[0] : 'No hay imagenes')} 
                alt={usuario.nombre} />
                <h2 className='font-bold text-xl'>{usuario.nombre} {usuario.apellido}</h2>
                <p className='text-md'>Email: {usuario.email}</p>
                <p className='text-md'>Telefono: {usuario.telefono}</p>
                <p>Activo: <span className={usuario.Eliminado ? 'text-red-500' : 'text-green-500'}>{usuario.Eliminado ? 'Eliminado' : 'Activo'}</span></p>
                <p>Rol: {usuario.rol}</p>
                <Link className="p-2 text-md bg-blue-400 rounded-lg" to = {`/administrador/usuarios/${usuario._id}`}>Ver usuario</Link>
        </div>
    )
}

AdministradorUsuario.propTypes = {
    usuario: PropTypes.shape({  
        _id: PropTypes.string,
        nombre: PropTypes.string,
        apellido: PropTypes.string,
        email: PropTypes.string,
        telefono: PropTypes.string,
        rol: PropTypes.string,
        Eliminado: PropTypes.bool,
        FechaCreacion: PropTypes.string,
        Imagen: PropTypes.string,
        _v: PropTypes.number,
        FechaActulizacion: PropTypes.string,
        FechaEliminacion: PropTypes.string,
        contraseña: PropTypes.string,
        compras: PropTypes.array
    })
}

export default AdministradorUsuario