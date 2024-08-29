import propTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'

const Filtrar = ({Categorias, SetCategorias, nombre, setNombre, className}) => {
    const categoriaSelected = 'w-20 text-md p-2 rounded-xl bg-blue-400 scale-110'
    const categoriaDefault = 'w-20 text-md p-2 rounded-xl bg-blue-400 hover:bg-blue-600 hover:scale-110';
    const [Filtros, setFiltro] = useState(false);
    const Chequeo = () => {
        document.getElementById('all').className = categoriaDefault;
        if(!Categorias){
            document.getElementById('all').className = categoriaSelected;
        }
        document.getElementById('Categorias').childNodes.forEach(element => {
            element.className = element.id == Categorias ? categoriaSelected : categoriaDefault
        });
    }

    useEffect(() => {
        Chequeo();
    }, [Categorias])

    return (
        <div className={'z-20 relative flex flex-col justify-center items-center gap-4 h-fit text-center px-4 py-4 rounded-xl shadow-xl' + className + (Filtros ? '' : 'translate-x-[100%]')}>
            <h1 className="text-2xl font-bold">Filtro</h1>
            <h2 className="text-xl font-bold">Buscar</h2>
            <div>
                <input type="text" placeholder='Buscar' className='w-40 text-center p-2 rounded-xl' value={nombre} onChange={e => setNombre(e.target.value)}/>
                {nombre && <button className="w-10 p-2 rounded-xl bg-gray-400 scale-75 text-mdhover:bg-gray-600 hover:scale-110" onClick={() => setNombre('')}>Limpiar</button>}
            </div>
            <h2 className="text-xl font-bold">Filtros</h2>
            <Link id='all' to="/productos" className={categoriaDefault} onClick={() => SetCategorias(null)}>Todos</Link>
            <div id='Categorias' className='grid grid-cols-2 gap-4 justify-center items-center'>
                <Link id='Antialergicos' to="/productos/Antialergicos" className={categoriaDefault} onClick={() => SetCategorias('Antialergicos')}>Antialergicos</Link>
                <Link id='Analgesicos' to="/productos/Analgesicos" className={categoriaDefault} onClick={() => SetCategorias('Analgesicos')}>Analgesicos</Link>
                <Link id='Antibioticos' to="/productos/Antibioticos" className={categoriaDefault} onClick={() => SetCategorias('Antibioticos')}>Antibioticos</Link>
                <Link id='Antihistaminicos' to="/productos/Antihistaminicos" className={categoriaDefault} onClick={() => SetCategorias('Antihistaminicos')}>Antihistaminicos</Link>
            </div>
            <button onClick={() => setFiltro(!Filtros)} className={'w-10 p-2 rounded-xl text-black absolute top-4 right-4 text-md'+ (Filtros ? 'bg-blue-400 hover:bg-blue-600 p-2' : 'translate-x-[100%] bg-blue-400 p-4 hover:bg-blue-600')}>
                +
            </button>
        </div>
    )
}

Filtrar.propTypes = {
    Categorias: propTypes.string,
    SetCategorias: propTypes.func,
    nombre: propTypes.string,
    setNombre: propTypes.func,
    className: propTypes.string
}

export default Filtrar