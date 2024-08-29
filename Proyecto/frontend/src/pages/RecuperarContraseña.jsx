import { Link } from "react-router-dom";
import Enlace from "../assets/Backend";
import axios from "axios";
import { useState } from "react";

const RecuperarContraseña = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const Enviar = async (e) => { e.preventDefault();
        setMessage('');
        try {
          const form = e.target;
          form.style.opacity = 0.5;
          const response = await axios.post(`${Enlace.backend}/recuperar-contraseña`, { email });
          form.style.opacity = 1;
          if (response.status === 200) {
            console.log(response.data);
            setMessage(response.data.message);
          }
    
        } catch (error) {
          const form = e.target;
          form.style.opacity = 1;
          console.log(error);
          setMessage(`Error[${error.response.status}]: ${error.response.data.message}`);
        }
      }
    
      return (
        <div className=" min-h-[85vh]">
          <div className=" min-h-[85vh] p-8 flex flex-col items-center justify-center">
            <div className="flex rounded-xl">
              <div className="p-4 flex flex-col items-center justify-center gap-4">
                <h1 className="text-3xl font-bold">Recuperar contraseña</h1>
                {message && <p className="text-n4">{message}</p>}
                <div className="py-8 flex flex-col gap-4">
                  <form className="flex flex-col gap-4">
                    <label>
                      Ingresa tu email:
                      <input className="p-2 rounded-xl w-full" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <p className="w-64 text-[#0009] text-sm text-justify">Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña</p>
                    <div className="flex w-full justify-center">
                      <button type="submit" className="w-48 bg-n5 text-n1 p-2 rounded-xl hover:bg-n1 hover:text-n5 transition duration-150" onClick={handleSubmit}>Reset Password</button>
                    </div>
                    <p>No tienes una cuenta? <Link to="/registrarse" className="text-xl">Registrate</Link></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default RecuperarContraseña;