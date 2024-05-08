import { useState } from 'react'
import { chat, cross, trash } from '../assets'

const historial  = [
    { id: 1, nombre: "Java" },
    { id: 2, nombre: "Astrologia" },
    { id: 3, nombre: "Reglas truco" },
    { id: 4, nombre: "Recetas cocina" },
    { id: 5, nombre: "c++" },
    { id: 6, nombre: "React" },
    { id: 7, nombre: "Probabilidad" },
    { id: 8, nombre: "Derivadas" },
  ];

function PanelHistorial({setPanelOpen}) {
  const [ventanaAbierta, setVentanaAbierta] = useState(false);

  const abrirVentana = () => {
    setVentanaAbierta(true);
  };

  const cerrarVentana = () => {
    setVentanaAbierta(false);
  };
  return (
      <>
        <div className='panel'>
          <div >
            <button onClick={()=>{setPanelOpen(false)}}><img src={cross} className='gap-2 items-center flex flex-row px-3 py-3 m-4 rounded-xl bg-color-lightblack '/></button>
              <div className ='historial '>
                <ul>
                    {
                    historial.map(item => (
                      <div key={item.id} className='container-panel justify-between my-2'>
                        <div className='flex flex-row gap-2'>
                          <img src={chat} alt="Chat" />
                          <h1 className='font-poppins font-medium text-base whitespace-nowrap overflow-hidden overflow-ellipsis'>{item.nombre}</h1>
                        </div>
                        <img src={trash} className='btn-animated h-5' alt="Delete" onClick={abrirVentana}/>
                      </div>))
                    }
                </ul>
              </div>
          </div>   
        </div>
        {ventanaAbierta && (
        <div className='absolute w-full h-full flex flex-row bg-color-black/20 backdrop-blur-xl z-20 justify-center'>
          <div className='mx-4 h-min self-center bg-color-black/70 backdrop-blur-2xl p-8 rounded-3xl border-[1px] drop-shadow-2xl'>
              <img src={cross} onClick={cerrarVentana} className='items-center px-3 py-3 rounded-xl bg-color-lightblack btn-animated'/>
              <h1 className='w-full text-center mt-10 '>¿Seguro desea eliminar el chat?</h1>
              <h2 className='w-full text-center mb-10'>Esta acción no podrá deshacerse</h2>
              <div className="flex flex-row items-center justify-between gap-2">
                <button 
                  className='bg-color-cream h-min py-4 px-6 rounded-xl btn-animated font-poppins flex-1' onClick={cerrarVentana}>
                    Aceptar
                </button>
                <button 
                  className='bg-color-lightblack/20 border-2 h-min py-4 px-6 rounded-xl btn-animated font-poppins text-color-cream flex-1' onClick={cerrarVentana}>
                  Cancelar
                </button>
              </div>
          </div>
        </div>

      )}
    </>
  )
}

export default PanelHistorial
