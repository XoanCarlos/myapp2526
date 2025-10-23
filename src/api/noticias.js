import axios from 'axios'
//  librería de JavaScript que actúa como un cliente HTTP 
// para realizar solicitudes entre el navegador y el servidor,
// URL base de la "API". Si usas json-server local, asegúrate de la IP:
const API_URL = 'http://localhost:3000/noticias'

// funcion para agregar noticia nueva
export const addNoticia = (nuevaNoticia) => {
  return axios.post(API_URL, nuevaNoticia)
              .then(res => res.data)
}

