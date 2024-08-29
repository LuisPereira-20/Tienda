
const InformacionUsuario = (Usuario)=>{
    return {
        _id : Usuario._id,
        nombre : Usuario.nombre,
        apellido : Usuario.apellido,
        correo : Usuario.correo,
        rol : Usuario.rol,
        telefono : Usuario.telefono,
        imagen : Usuario.imagen,
        fechaCreacion : Usuario.fechaCreacion,
        compras : Usuario.compras,
        carrito : Usuario.carrito
    }
}
export default InformacionUsuario