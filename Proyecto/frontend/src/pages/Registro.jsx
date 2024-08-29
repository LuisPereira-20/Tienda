import Enlace from "../assets/Backend";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Autenticacion from "../Authentication/Autenticacion";

const Registro = () => {
    const Autenticacion = useAutenticacion();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
     const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);

    const Enviar = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          setError("Error: Passwords do not match");
          return;
        }
    
        try {
          const form = e.target;
          form.style.opacity = 0.5;
          setError(null);
          const response = await axios.post(`${Enlace.backend}/users`, {
            nombre,
            apellido,
            telefono,
            correo,
            contraseña,
          });
          form.style.opacity = 1;
          if(response.status === 201) {
            navigate("/login");
          }
        } catch (error) {
          const form = e.target;
          form.style.opacity = 1;
          setError(`Error[${error.response.status}]: ${error.response.data.message}`);
          console.log(error);
        }
      }
    
      useEffect(() => {
        if (Autenticacion.isAuthenticated()) {
          navigate("/");
        }
        window.scrollTo(0, 0);
      }, []);

    return (
            <div className="">
              <div className="w-full p-8 flex flex-col items-center justify-center">
                <div className="flex flex-col rounded-xl">
                  <div className="p-4 flex flex-col items-center justify-center gap-4">
                    <h1 className="text-3xl font-bold">Regitrarse</h1>
                    <h2>Crea tu cuenta</h2>
                    {error && <p className="text-red-500 bg-red-100 px-4 py-2 rounded-full">{error}</p>}
                    <form className="flex flex-col lg:grid lg:grid-cols-2 lg:justify-items-center gap-4 px-8 py-4" onSubmit={Enviar}>
                      <label className="flex flex-col">
                         Nombre:
                        <input className="p-2 rounded-xl" type="text" placeholder="Ingresa tu nombre" value={name} onChange={(e) => setName(e.target.value)} />
                      </label>
                      <label className="flex flex-col">
                        Apellido:
                        <input className="p-2 rounded-xl" type="text" placeholder="Ingresa tu apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                      </label>
                      <label className="flex flex-col">
                        Telefono:
                        <input className="p-2 rounded-xl" type="text" placeholder="Ingresa tu numero de telefono" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </label>
                      <label className="flex flex-col">
                        Email:
                        <input className="p-2 rounded-xl" type="email" placeholder="Ingresa tu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </label>
                      <label className="flex flex-col">
                        Contraseña:
                        <input className="p-2 rounded-xl" type="password" placeholder="Ingresa tu Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </label>
                      <label className="flex flex-col">
                        Confirmar contraseña:
                        <input className="p-2 rounded-xl" type="password" placeholder="Confirma tu contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                      </label>
                      <input type="submit" value="Registrarse" className="col-span-2 self-center cursor-pointer w-32 p-2 rounded-xl  hover:scale-105 transition duration-150"/>
                    </form>
                      <p>¿Ya tienes una cuenta? <Link to="/login" className="">Login</Link></p>
                  </div>
                </div>
              </div>
            </div>
            );
          }

export default Registro