import React from "react";
import { useState } from "react";

const BarraBusqueda = ({onSearch}) => {
    const [busqueda, setBusqueda] = useState("");

    const handleChange = (event) => {
        setBusqueda(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div className="flex justify-center my-[40px] w-40">
            <input
                className="border border-gray-400 rounded-lg py-2 px-4 w-full text-gray-600 shadow-sm"
                type="text"
                placeholder=" Buscar"
                value={busqueda}
                onChange={handleChange}
            />
        </div>
    );
};
export default BarraBusqueda;
