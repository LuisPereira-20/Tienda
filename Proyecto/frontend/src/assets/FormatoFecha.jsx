const Fecha  = (fecha) => {
    const date = new Date(fecha);
    return date.toISOString().slice(0, 10).split('-').reverse().join('-');
}

export default Fecha