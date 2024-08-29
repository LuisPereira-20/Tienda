import React from 'react'
import ReactDOM from 'react-dom/client'
import {Routes, Route, Router} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AutenticacionProvider from './Authentication/Autenticacion'
import CarritoProvider from './components/Carritoprovider' 
import Home from './pages/Home'
import RutaProtegida from './components/RutaProtegida'
import RutaAdmin from './components/RutaAdministrador'
import Administrador from './pages/Administrdor'
import AdminCategoria from './pages/AdministradorCategorias'
import AdminCompras from './pages/AdministradorCompras'
import AdminProductos from './pages/AdministradorProductos'
import AdminUsuarios from './pages/AdministradorUsuarios'
import Carrito from './pages/Carrito'
import EditarUsuario from './pages/EditarUsuario'
import Login from './pages/Login'
import NuevoProducto from './pages/NuevoProducto'
import NuevoUsuario from './pages/NuevoUsuario'
import Compra from './pages/Compra'
import Producto from './pages/Producto'
import ProductoImagen from './pages/ProductoImagen'
import Perfil from './pages/Perfil'
import Productos from './pages/Productos'
import RecuperarContraseña from './pages/RecuperarContraseña'
import ImagenUsuario from './pages/ImagenUsuario'
import VerCompra from './pages/VerCompra'
import Registro from './pages/Registro'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
    <AutenticacionProvider>
      <Router>
          <CarritoProvider>
            <Navbar background={"bg-blue-400"}/>
            <main className="bg-gray-200 min-h-screen">
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/productos" element={<Productos />}/>
              <Route path="/productos/:id" element={<Producto />}/>
              <Route path="/carrito" element={<Carrito />}/>
              <Route path="/compra/:id" element={<Compra />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/registro" element={<Registro />}/>
              <Route path="/recuperar-contraseña" element={<RecuperarContraseña />}/>
              <Route path="/perfil/editar" element={<EditarUsuario />}/>
              <Route path="/" element={<RutaProtegida/>}/>
              <Route path="/perfil" element={<Perfil />}/>
                <Route path="/" element={<RutaAdmin/>}/>
                  <Route path="administrador" element={<Administrador/>}/>
                  <Route path="administrador/usuarios" element={<AdminUsuarios/>}/>
                  <Route path="administrador/usuarios/nuevo" element={<NuevoUsuario/>}/>
                  <Route path='administrador/usuarios/:id/imagen' element={<ImagenUsuario/>}/>
                  <Route path="administrador/compras" element={<AdminCompras/>}/>
                  <Route path="administrador/compras/:id" element={<VerCompra/>}/>
                  <Route path="administrador/productos" element={<AdminProductos/>}/>
                  <Route path="administrador/productos/nuevo_producto" element={<NuevoProducto/>}/>
                  <Route path="administrador/productos/:id/imagen" element={<ProductoImagen/>}/>
                  <Route path="administrador/categorias" element={<AdminCategoria/>}/>
            </Routes>
            </main>
          </CarritoProvider>
        <Footer/>
      </Router>
    </AutenticacionProvider>
    </>
  </React.StrictMode>,
)
