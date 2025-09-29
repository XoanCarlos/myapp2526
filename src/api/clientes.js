import axios from 'axios'

// URL base de la "API". Si usas json-server:
const API_URL = 'http://localhost:3000/clientes'

export const obtenerClientes = () => {
  return axios.get(API_URL)
              .then(res => res.data)
}

/*

// Simula agregar un cliente
export const agregarCliente = (cliente) => {
  clientesData.push(cliente); // en un JSON real no se modifica, pero para testing sirve
  return Promise.resolve(cliente);
}

// Simula actualizar un cliente
export const actualizarCliente = (id, cliente) => {
  const index = clientesData.findIndex(c => c.id === id);
  if (index !== -1) clientesData[index] = { id, ...cliente };
  return Promise.resolve(clientesData[index]);
}

// Simula eliminar un cliente
export const eliminarCliente = (id) => {
  const index = clientesData.findIndex(c => c.id === id);
  if (index !== -1) clientesData.splice(index, 1);
  return Promise.resolve();
}
*/