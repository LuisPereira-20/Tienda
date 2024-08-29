const regex = {
    nombre: /^[A-Za-z\s]{3,50}$/i, // La 'i' hace que sea case-insensitive
    apellido: /^[A-Za-z\s]{3,50}$/i,
    descripcion: /^[A-Za-z0-9\s]{2,500}$/i,
    correo: /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i,
    contraseña: /(?=(.[0-9]))(?=.[\!@#$%^&()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.[a-z])(?=.[A-Z]).{8,}/
};

const validar = (data) => {
    return (
        regex.nombre.test(data.nombre) &&
        regex.apellido.test(data.apellido) &&
        regex.descripcion.test(data.descripcion) &&
        regex.correo.test(data.correo) &&
        regex.contraseña.test(data.contraseña)
    );
};
export { regex, validar };
