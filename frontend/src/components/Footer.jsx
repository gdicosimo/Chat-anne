import React from 'react'
import { send } from '../assets'
import { useState } from 'react';
const Footer = ({setMessages}) => {
    // Estado para almacenar el valor del input
  const [inputValue, setInputValue] = useState('');
  
  // Función para manejar el cambio en el input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Función para manejar el envío del formulario (si es necesario)
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes hacer lo que quieras con el valor del input (por ejemplo, enviarlo a través de una solicitud)
    console.log('Valor del input:', inputValue);
    setMessages(inputValue)
    // Limpia el valor del input después de manejarlo (si es necesario)
    setInputValue('');
  };
  return (
    <div className='w-full border-t-2 border-color-lightblack justify-center flex '>
        <div className='w-full max-w-[900px] flex flex-row px-5 py-8 gap-4 '>
            <input 
              className="font-poppins font-medium text-color-cream placeholder:text-color-cream/50 
              placeholder:font-poppins placeholder:font-medium block bg-color-middleblack hover:bg-color-lightblack transition-all duration-500 w-full  rounded-[100px] py-3 px-4 focus:outline-none" 
              placeholder="Start asking..." 
              type="text" 
              name="search"
              value={inputValue} // Asigna el valor del input al estado
              onChange={(e)=>{handleInputChange(e)}}
              />
            <img src={send} className='btn-animated' onClick={(e)=>{handleSubmit(e)}}/>
        </div>
    </div>
  )
}

export default Footer
