import PropTypes from 'prop-types';


const Paginacion = ({page, setPage, className, opciones}) => {

    return (
        <div className={"flex flex-col p-2 rounded-xl justify-center items-center" + className}>
            <div className='flex gap-8'>
                <button onClick={() => setPage(opciones.prevPage)} disabled={!opciones.hasPrevPage}>
                    {!opciones.hasPrevPage ? <div className='h-6 w-6'></div>: <p>Anterior</p>}
                </button>
                <div>
                    <span>Pagina</span>
                    <span>{page}/{opciones.totalPages}</span>
                    <span>Total {opciones.totalDocs}</span>
                </div>
                <button onClick={() => setPage(options.nextPage)} disabled={!options.hasNextPage} >
                    {!options.hasNextPage ? <div className="h-6 w-6"></div> : <img className="h-6 w-6 hover:scale-110 transition duration-300" src="/svg/rightArrow.svg" alt="Next" />}
                </button>
            </div>
        </div>
    )
}
Paginacion.propTypes = {
    page: PropTypes.number,
    setPage: PropTypes.func,
    opciones: PropTypes.shape({
        prevPage: PropTypes.number,
        nextPage: PropTypes.number,
        hasPrevPage: PropTypes.bool,
        hasNextPage: PropTypes.bool,
        totalDocs: PropTypes.number,
        totalPages: PropTypes.number
    }),
    className: PropTypes.string
}

export default Paginacion