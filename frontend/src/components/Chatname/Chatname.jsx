import React from 'react'

const Chatname = () => {
    //Traer el nombre del chat desde la api cuando sea un chat selecciona
    //si el usuario no esta logueado, el nombre del chat es default
    //al clickearlo tiene que abrir un panel para cambiar el nombre si el usuario esta logueado
    //si no esta logueado, dirigir a que vaya al panel
  return (
    <div className='flex px-[10px] py-[5px] bg-color-lightblack rounded-lg'>
        <h3>untitled chat</h3>
    </div>
  )
}

export default Chatname
