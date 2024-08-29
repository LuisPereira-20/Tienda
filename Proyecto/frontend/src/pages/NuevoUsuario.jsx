import Enlace from "../assets/Backend";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Espera from "../components/Espera";
import { regex } from "../assets/Regex";

const NuevoUsuario = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const goTo = useNavigate()
  
    const reinicio = () => {
      setName("")
      setLastName("")
      setPhone("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setError(null)
    }
    const Enviar = async (e) => {
      e.preventDefault()
      window.scrollTo(0, 0)
      try {
        setLoading(true)
        const response = await axios.post(url.backend + "/users", {
          name,
          lastName,
          phone,
          email,
          password
        })
        console.log(response.data)
        if (response.status === 201) {
          setError(null)
          reset()
          window.scrollTo(0, 0)
          goTo("/admin/user/img/" + response.data.docs[0]._id)
        }
        setLoading(false)
      }
      catch (error) {
        console.log(error)
      }
    }
    return (
        <div className="flex flex-col items-center min-h-[85vh] gap-4 py-8" >
          <h1 className="text-3xl">Nuevo usuario</h1>
          {error && <p className="text-red-500">Error: {error}</p>}
          <div className="grid gap-4">
            {loading ? <Espera /> : <form className="grid gap-4" method="POST" onSubmit={Enviar}>
              <label className="grid gap-2" htmlFor="name">
                <span className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500">Nombre:</span>
                <input className={"w-full p-2 rounded-lg"} type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required/>
              </label>
              <label className="grid gap-2" htmlFor="lastName">
                <span className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500">Apellido:</span>
                <input className={"w-full p-2 rounded-lg"} type="text" name="lastName" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </label>
              <label className="grid gap-2" htmlFor="phone">
                <span className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500">Telefono:</span>
                <input className={"w-full p-2 rounded-lg"} type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </label>
              <label className="grid gap-2" htmlFor="email">
                <span className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500">Email:</span>
                <input className={"w-full p-2 rounded-lg"} type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              <label className="grid gap-2" htmlFor="password">
                <span className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500">Contraseña:</span>
                <input className={"w-full p-2 rounded-lg"} type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </label>
              <label className="grid gap-2" htmlFor="confirmPassword">
                <span className="text-lg after:content-['*'] after:ml-0.5 after:text-red-500">Confirmar contraseña:</span>
                <input className={"w-full p-2 rounded-lg"} type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </label>
              <label className="grid grid-cols-3 gap-2" htmlFor="submit">
                <Link className={"w-full cursor-pointer p-2 rounded-lg"} to="/admin/users">Cancelar</Link>
                <input className={"w-full cursor-pointer  p-2 rounded-lg"} type="reset" value="Reset" />
                <input className={"w-full cursor-pointer  p-2 rounded-lg "} type="submit" value="Submit" />
              </label>
            </form>}
          </div>
        </div>
      )
    }
    export default NuevoUsuario