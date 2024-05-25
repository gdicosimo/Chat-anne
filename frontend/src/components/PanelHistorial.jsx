import { useEffect, useState } from 'react';
import { chat, cross, trash } from '../assets';
import useFetch from '../Hooks/useFetch';
import { OrbitProgress } from 'react-loading-indicators';
import { Link } from 'react-router-dom';
import RemoveChatWindow from './RemoveChatWindow';

const historial = [
  { id: 1, nombre: "Java" },
  { id: 2, nombre: "Astrologia" },
  { id: 3, nombre: "Reglas truco" },
  { id: 4, nombre: "Recetas cocina" },
  { id: 5, nombre: "c++" },
  { id: 6, nombre: "React" },
  { id: 7, nombre: "Probabilidad" },
  { id: 8, nombre: "Derivadas" },
];

function PanelHistorial({ setPanelOpen, panelOpen }) {
  const [ventanaAbierta, setVentanaAbierta] = useState(false);
  const { data, loading, error, fetchdata } = useFetch();
  const [chats, setChats] = useState(null);
  const [chatId, setChatId] = useState("")

  useEffect(() => {
    async function getChats() {
      await fetchdata(null, 'GET_LIST_CHATS');
    }
    if (panelOpen) {
      getChats();
    }
  }, [panelOpen, ventanaAbierta]);

  useEffect(() => {
    if (data && data.chats) {
      setChats(data.chats);
    }
  }, [data]);

  useEffect(()=>{
    console.log(chatId)
  },[chatId])

  const abrirVentana = (id) => {
    setVentanaAbierta(true);
    setChatId(id)
  };

  const cerrarVentana = () => {
    setVentanaAbierta(false);
  };

  useEffect(()=>{}, [])

  return (
    <>
      <div className='panel'>
        <div>
          <button onClick={() => { setPanelOpen(false) }}>
            <img src={cross} className='gap-2 items-center flex flex-row px-3 py-3 m-4 rounded-xl bg-color-lightblack' />
          </button>
          <div className='historial'>
            <ul>
              {
                loading ? (
                  <div className='items-center flex flex-col'>
                    <OrbitProgress variant='bubble-dotted' color='#FDF0D5' size='small' text='' textColor='' easing='ease-in-out' />
                  </div>
                ) : (
                  chats && chats.map(item => (
                    <div key={item._id} className='container-panel justify-between my-2'>
                      <div className='flex flex-row gap-2 max-w-[80%]'>
                        <img src={chat} alt="Chat" />
                        <Link to={`/chat/${item._id}`} className='font-poppins text-color-cream font-medium text-base whitespace-nowrap overflow-clip overflow-ellipsis '>
                          {item.name}
                        </Link>
                      </div>
                      <img src={trash} className='btn-animated h-5' alt="Delete" onClick={()=>{abrirVentana(item._id)}} />
                    </div>
                  ))
                )
              }
            </ul>
          </div>
        </div>
      </div>
      {
        ventanaAbierta ? 
        <RemoveChatWindow cerrarVentana={cerrarVentana} chatId={chatId}/> : null
      }
    </>
  );
}

export default PanelHistorial;
