import PropTypes from 'prop-types';
import { useState } from 'react';
import Enlace from '../assets/Backend.jsx';


const ImagenSeleccion = ({ image, className }) => {
    const [imagen, setImagen] = useState(image[0]);

    return (
        <div className="flex flex-col items-center justify-center">
            <img className={"h-72 w-72  object-cover rounded" + className} 
            src={Enlace.backend + "/" + imagen} 
            alt="" />
            <div className="flex flex-col items-center justify-center">
                {imagen.map((imagen) => (
                    <img className={'h-12 w-12 object-cover rounded cursor-pointer hover:scale-110 transition duration-300' + (imagen === img ? 'border-2' : 'opacity-50')} 
                    src={Enlace.backend + "/" + imagen} 
                    alt="" 
                    key={imagen} 
                    onClick={() => setImagen(imagen)} />
                ))}
            </div>
        </div>
    )
};

ImagenSeleccion.propTypes = {
    imagen: PropTypes.array,
    className: PropTypes.string
}

export default ImagenSeleccion