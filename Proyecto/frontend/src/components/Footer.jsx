import {Router} from 'react-router-dom'
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-blue-400 text-[gray-400] flex flex-col py-16 gap-4">
            <div>
                <div>
                    <h2 className="font-bold text-lg">FarmamigoIV</h2>
                    <p className="text-[gray-400]">El aliado de tu salud</p>
                </div>
                <div className="flex flex-col gap-4">
                    <h3 >Navega por nuestra web</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/productos">Productos</Link></li>
                        <li><Link to="/categorias">Categorias</Link></li>
                        <li><Link to="/perfil">Perfil</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className='font-bold text-lg'>Contactanos</h3>
                </div>
            </div>
            <p className="text-center">© Farmacia FarmamigoIV. Todos los derechos reservados.</p>
        </footer>
    )
}
export default Footer