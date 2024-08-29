import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

const AñadirNuevo = ({type}) => {
    return (
        <Link to={`/Administrador/${type}/nuevo`} className="bg-gray-200 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-xl">Añadir nuevo</Link>
    )
}

AñadirNuevo.propTypes = {
    type: PropTypes.string
}

export default AñadirNuevo