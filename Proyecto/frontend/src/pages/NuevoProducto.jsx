import Enlace from "../assets/Backend";
import axios from "axios";
import Espera from "../components/Espera";
import { regex } from "../assets/Regex";
import { useAutenticacion } from "../Authentication/Autenticacion";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const NuevoProducto = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(1)
    const [quantity, setQuantity] = useState(1)
    const [discount, setDiscount] = useState(0)
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const Autenticacion = useAutenticacion();
    const navigate = useNavigate();

    const getCategories = async () => {
        try {
            setError(null)
            setLoading(true)
            const response = await axios.get(`${url.backend}/category`)
            setLoading(false)
            setCategories(response.data.docs)
        } catch (error) {
            setError(`Error[${error.response.status}]: ${error.response.data.message}`)
            console.log(error)
        }
        }
        const Enviar = async (e) => {
        e.preventDefault()
        window.scrollTo(0, 0)
        if(!regex.name.test(name)){
            setError("Name is not valid")
            return
        }
        if(!regex.description.test(description)){
            setError("Description is not valid")
            return
        }
        if(!category){
            setError("A category is selected")
            return
        }
        try {
            setLoading(true)
            setError(null)
            const response = await axios.post(`${url.backend}/product`, {
            name,
            description,
            price,
            quantity,
            category,
            discount
            }, {
            headers: {
                "Authorization": `Bearer ${auth.getAccessToken()}`
            }
            })
            if (response.status === 201) {
            console.log("Product created")
            goTo("/admin/product/imgs/" + response.data.docs[0]._id)
            }
        } catch (error) {
            setError(`Error[${error.response.status}]: ${error.response.data.message}`)
            console.log(error)
        }
        setLoading(false)
        }
    
        useEffect(() => {
        getCategories()
        }, [])
    
        return (
                <div className="grid justify-items-center gap-8 p-8">
                  <h1 className="text-2xl">Nuevo Producto</h1>
                  {error && <p className="text-red-500">{error}</p>}
                  {loading && <Espera />}
                  <form className="grid justify-items-center gap-4" onSubmit={Enviar}>
                    <label className="grid gap-2" htmlFor="name">
                      <span className="after:content-['*'] after:text-red-500 text-lg">Name:</span>
                      <input placeholder="Enter product name" autoFocus className={"cursor-pointer p-2 rounded-lg bg-n1"} type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label className="grid gap-2" htmlFor="description">
                      <span className="after:content-['*'] after:text-red-500 text-lg">Description:</span>
                      <textarea name="description" rows={5} maxLength={100} className={" cursor-pointer p-2 rounded-lg bg-n1"} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ingresa la descripción" id="description"></textarea>
                    </label>
                    <label className="flex items-center justify-center w-full gap-4" htmlFor="price">
                      <span className="after:content-['*'] after:text-red-500 text-lg">Price:</span>
                      <input className={"cursor-pointer text-end py-2 px-4 rounded-lg bg-n1"} min={0} max={1000000} type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />$15
                    </label>
                    <label className="flex items-center justify-center w-full gap-4" htmlFor="stock">
                      <span className="after:content-['*'] after:text-red-500 text-lg">Stock:</span>
                      <input className={"cursor-pointer text-end py-2 px-4 rounded-lg bg-n1"} min={0} max={1000000} type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </label>
                    <label className="flex items-center justify-center w-full gap-4" htmlFor="descuento">
                      <span className="text-lg">Descuento:</span>
                      <input className={"cursor-pointer text-end py-2 px-4 rounded-lg bg-n1"} min={0} max={100} type="number" id="discount" value={discount} onChange={(e) => setDiscount(e.target.value)} />%
                    </label>
                    <label className="after:content-['*'] after:text-red-500 flex justify-center items-center w-full gap-2" htmlFor="categoria">
                      <span className="text-lg">Categoria:</span>
                      <select className={"cursor-pointer p-2 rounded-lg bg-n1"} id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Selecciona una categoria</option>
                        {categories && categories.map((category) => (
                          <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                      </select>
                    </label>
                    <div className="flex gap-4">
                      <Link to="/admin/products" className={"py-2 px-4 rounded-lg bg-n5 text-n1 hover:scale-105 transition duration-300 text-lg"}>Cancelar</Link>
                      <button disabled={loading} onClick={(e) => Enviar(e)} className={"py-2 px-4 rounded-lg bg-n4 text-n1 hover:scale-105 transition duration-300 text-lg"}  type="submit">Enviar</button>
                    </div>
                  </form>
                </div>
              )
            }
            
export default NuevoProducto