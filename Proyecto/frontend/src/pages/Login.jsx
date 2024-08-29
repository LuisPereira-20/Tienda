import { useState, useEffect } from "react";
import { useAutenticacion } from "../Authentication/Autenticacion";
import { useNavigate, Link } from "react-router-dom";
import Enlace from "../assets/Backend";
import axios from "axios";

const Login = () => {
    const Autenticacion = useAutenticacion();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const Enviar = async (e) => {
        e.preventDefault();
        try {
            const form = e.target;
            form.style.opacity = 0.5;
            setError("");
            const response = await axios.post(`${Enlace.backend}/login`, { 
                email, password 
            });
           form.style.opacity = 1;
           if (response.status === 200) {
            if (response.data.accessToken && response.data.refreshToken) {
                Autenticacion.guardarUsuario(response.data);
                console.log("Login successful");
                navigate("/");
                window.location.reload();
            }
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
    }, [])

    return (
        <div className="bg-[url('/Animalife.jpeg')] bg-cover bg-center min-h-[85vh]">
      <div className="bg-[rgba(0,0,0,0.6)] min-h-[85vh] p-8 flex flex-col items-center justify-center">
        <div className=" flex bg-n6 rounded-xl">
          <div className="p-4 flex flex-col items-center justify-center gap-2">
            <h1 className="text-3xl font-bold">Login</h1>
            <div className="w-64 text-sm text-justify">Enter your credentials</div>
            {error && <div className="text-red-500 bg-red-100 px-4 py-2 rounded-full">{error}</div>}
            <div className="py-4 flex flex-col gap-4">
              <form className="flex flex-col gap-4" onSubmit={Enviar}>
                <label>
                  Email:
                  <input className="p-2 rounded-xl w-full" type="text" placeholder="ingrese su email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                  Contraseña:
                  <input className="p-2 rounded-xl w-full" type="password" placeholder="ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <div className="flex justify-center">
                  <button type="submit" className="w-32 bg-n5 text-n1 p-2 rounded-xl hover:bg-n1 hover:text-n5 transition duration-150">Login</button>
                </div>
              </form>
              <p>Olvidaste tu contraseña <Link to="/Recuperar contraseña" className="text-md font-black cursor-pointer">Recuperar contraseña</Link></p>
              <p>No tienes cuenta? <Link to="/Registrarse" className="text-md cursor-pointer font-black">Registrarse</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    )

}

export default Login
