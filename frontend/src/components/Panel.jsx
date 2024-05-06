import { useState } from 'react'
import { chat } from '../assets'
import { cross } from '../assets'
import { basura } from '../assets'

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

function App() {
  const [ventanaAbierta, setVentanaAbierta] = useState(false);

  const abrirVentana = () => {
    setVentanaAbierta(true);
  };

  const cerrarVentana = () => {
    setVentanaAbierta(false);
  };
  const [panelAbierto, setPanelAbierto] = useState(true);

  const togglePanel = () => {
    setPanelAbierto(!panelAbierto);}
    if (panelAbierto){
        return (
            <>
            <div className='panel'>
                <div >
                <button onClick={togglePanel}><img src={cross} className='gap-2 items-center flex flex-row px-3 py-3 m-4 rounded-xl bg-color-lightblack '/></button>
                <div className ='historial'>
                    <ul>
                    {historial.map(item => (
                       <div className='container-panel' style={{ display: 'flex', alignItems: 'center' }}>
                       <img src={chat} alt="Chat" />
                       <h1 key={item.id}>{item.nombre}</h1>
                       <div style={{ marginLeft: 'auto' }}>
                           <button onClick={abrirVentana}>
                               <img src={basura} alt="Añadir"/>
                           </button>
                       </div>
                   </div>))}
                    </ul>
                </div>
            </div>   
        </div>
        {ventanaAbierta && (
        <div className="ventana">
          <div className='Cartel'>
          <button onClick={cerrarVentana}><img src={cross} className='top-0 gap-2 items-center flex flex-row px-3 py-3 m-4 rounded-xl bg-color-lightblack '/></button>
                    <h1>Seguro que desea eliminar el chat?</h1>
          <div className="botones"style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ padding: '10px', backgroundColor: 'white', color: 'black', borderRadius: '5px', border: 'none', cursor: 'pointer', margin: '5px'}} onClick={cerrarVentana}>Aceptar</button>
            <button style={{ padding: '10px', backgroundColor: 'grey', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer', margin: '5px'}} onClick={cerrarVentana}>Cancelar</button>
          </div>
        </div>
        </div>
      )}
        </>
        )}
    else return null;
}

export default App
