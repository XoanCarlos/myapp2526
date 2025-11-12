const API_URL = 'http://localhost:3000/taller'

// Obtener todas las citas
export async function getCitasTaller() {
  const res = await fetch(API_URL)
  return await res.json()
}

// Añadir cita
export async function addCitaTaller(cita) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cita)
  })
  return await res.json()
}

// Actualizar cita
export async function updateCitaTaller(id, cita) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cita)
  })
  return await res.json()
}

// Eliminar cita
export async function deleteCitaTaller(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
}
