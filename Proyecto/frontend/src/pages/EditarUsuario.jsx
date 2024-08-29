import { useState, useEffect } from "react";
import { useAutenticacion } from "../Authentication/Autenticacion";
import { useNavigate, Navigate } from "react-router-dom";
import SubirArchivo from "../components/SubirArchivo";
import Enlace from "../assets/Backend";
import axios from "axios";

const EditarUsuario = () => {
    const Autenticacion = useAutenticacion();
    const navigate = useNavigate();
    const user = Autenticacion.Usuario();
    const [imagen , setImagen] = useState(false);
    const [name, setName] = useState(user.nombre);
    const [lastName, setLastName] = useState(user.apellido);
    const [phone, setPhone] = useState(user.telefono);
    const [email, setEmail] = useState(user.correo);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const Enviar = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          setError("Error: Passwords do not match");
          return;
        }
        const form = e.target;
        form.style.opacity = 0.5;
        try {
          setError("");
          const data = {
            name,
            lastName,
            phone,
            email,
            password,
          }
          if (!password) {
            delete data.password;
          }
          const response = await axios.patch(`${url.backend}/users/${user._id}`, data,
            {
              headers: {
                "Authorization": `Bearer ${auth.getAccessToken()}`
              },
            }
          );
          if (response.status === 200) {
            console.log("Edit successful");
            form.style.opacity = 1;
            goTo("/profile");
            window.location.reload();
          }
    
        } catch (error) {
          setError(`Error[${error.response.status}]: ${error.response.data.message}`);
          console.log(error);
        }
        form.style.opacity = 1;
      }
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
      if(!auth.isAuthenticated) {
        return <Navigate to="/"/>
      }
    
      return (
        <div className="min-h-[85vh] flex flex-col justify-center items-center gap-4 p-8">
          <h1 className="text-3xl font-bold">Editar Usuario</h1>
          <div className="w-40 h-40 rounded-full relative">
        <img className="h-full w-full object-cover rounded-full hover:opacity-75 hover:cursor-pointer" src={Enlace.backend+"/"+(Usuario.image?Usuario.image:"")} alt={Usuario.nombre+" profile picture"} />
        <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full hover:opacity-75 hover:cursor-pointer" 
        onClick={() => setImagen(!imagen)}>Editar</button>
      </div>
      {imagen && 
      <SubirArchivo id={Autenticacion.Usuario()._id}/>
      }
      {error && <p className="text-red-500">{error}</p>}
      <form className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-4 md:w-[300px] lg:w-[500px]" 
      onSubmit={Enviar} >
        <label className="flex flex-col w-full">Name:
        <input className="px-4 py-2 rounded-lg" type="text" 
        id="nombre" 
        name="nombre" 
        value={nombre} 
        onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="flex flex-col w-full">Apellido:
          <input className="px-4 py-2 rounded-lg" type="text" id="lastName" name="lastName" value={apellido} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label className="flex flex-col w-full">
          Telefono:
          <input className="px-4 py-2 rounded-lg" type="text" id="phone" name="phone" value={telefono} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <label className="flex flex-col w-full">
          Email:
          <input className="px-4 py-2 rounded-lg" type="text" id="email" name="email" value={correo} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="flex flex-col w-full w-full">
          Contraseña:
          <input className="px-4 py-2 rounded-lg" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep the same"/>
        </label>
        {password && <label className="flex flex-col w-full">
          Confirmar contraseña:
          <input className="px-4 py-2 rounded-lg" type="password" id="confirmarcontraseña" name="confirmarcontraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>}
        <div className="flex gap-4 p-4">
          <button className="col-span-2 self-center cursor-pointer w-32  p-2 rounded-xl  hover:scale-105" onClick={() => goTo("/profile")}>Cancelar</button>
          <input type="submit" value="Save" className="col-span-2 self-center cursor-pointer w-32 rounded-xl hover:scale-105"/>
        </div>
      </form>
    </div>
  )
}
export default EditarUsuario

