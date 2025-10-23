import axios from 'axios'

const API_URL = 'http://localhost:3000/noticias'

// Funcion para agregar una noticia nueva
export const addNoticia = async (nuevaNoticia) => {
  try {
    const response = await axios.post(API_URL, nuevaNoticia)
    return response.data
  } catch (error) {
    console.error('Error al agregar la noticia:', error)
    throw error // re-lanzamos el error para que quien llame pueda manejarlo
  }
}
