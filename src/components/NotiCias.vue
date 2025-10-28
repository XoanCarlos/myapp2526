<template>
  <div class="container d-flex flex-column shadow-sm bg-light w-100">
    <!-- Título centrado -->
    <div class="text-center mb-2 mt-1 w-100">
      <h4 class="text-center my-1 bg-primary-subtle py-2">Noticias del Motor</h4>
    </div>
    <form @submit.prevent="agregarNoticia" class="w-100">
      <!-- Fila 1: Título -->
      <div class="row g-2 align-items-center mb-1">
        <div class="col-auto d-flex align-items-center">
          <label for="titulo" class="text-primary fw-bold form-label mb-0">Título:</label>
        </div>
        <div class="col">
          <input
            type="text"
            id="titulo"
            v-model="nuevaNoticia.titulo"
            class="form-control border-primary rounded-0"
            maxlength="128"
            placeholder="máximo 128 caracteres"
          />
        </div>
      </div>

      <!-- Fila 2: Label Descripción -->
      <div class="row g-3 align-items-start mb-1 mt-3">
        <div class="col-md-12 text-md-start">
          <label for="contenido" class="text-primary fw-bold form-label mb-0">Contenido:</label>
        </div>
      </div>

      <!-- Fila 3: Textarea -->
      <div class="row g-3 mb-2 align-items-start">
        <div class="col-md-12">
          <textarea
            id="contenido"
            v-model="nuevaNoticia.contenido"
            class="form-control border-primary rounded-0"
            maxlength="512"
            rows="4"
            placeholder="máximo 512 caracteres"
          ></textarea>
        </div>
      </div>

      <!-- Fila 4: Botón -->
      <div class="row g-3 mt-2">
        <div class="col text-center">
          <button type="submit" class="btn btn-primary btn-sm px-4 rounded-0">
            Agregar Noticia
          </button>
        </div>
      </div>
    </form>
  <!-- Tabla sin bordes -->
  <table class="table table-borderless mt-3">
    <tbody>
      <template v-for="noticia in noticias" :key="noticia.id">  <!-- Template dentro de otro template-->
        <!-- Fila 1: título y fecha -->
        <tr>
          <td>
            <div class="d-flex justify-content-between">
              <strong class="text-primary">{{ noticia.titulo }}</strong>
              <small class="text-muted text-secondary">{{ noticia.fecha }}</small>
            </div>
          </td>
      </tr>
      <!-- Fila 2: contenido con "mostrar más/menos" -->
      <tr>
        <td>
          <span>
            {{ isExpanded[noticia.id] 
                ? noticia.contenido : noticia.contenido.slice(0, 200) + '...' }}
          </span>
          <a href="#" @click.prevent="toggleExpand(noticia.id)" class="float-end text-decoration-none">
            {{ isExpanded[noticia.id] ? 'Mostrar menos...' : 'Seguir leyendo...' }}
          </a>
          <button class="btn btn-outline-primary p-0 m-0 align-baseline float-end border-0 me-2" @click="borraNoticia(noticia.id)">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
      <!-- Fila 3: espacio en blanco -->
      <tr><td>&nbsp;</td></tr>
    </template>
  </tbody>
</table>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { addNoticia, getNoticias, deleteNoticia } from '@/api/noticias'

const nuevaNoticia = ref({
  titulo: '',
  contenido: '',
  fecha: new Date().toISOString().split('T')[0],
})

const noticias = ref([])   // mapea un array de noticias
const isExpanded = ref({}) // mapea el estado de expansión por ID es decir un objeto con claves como IDs y valores booleanos

onMounted(() => {
  cargarNoticias()
})

const toggleExpand = (id) => {
  isExpanded.value[id] = !isExpanded.value[id]
}

const cargarNoticias = async () => {
  try {
    noticias.value = await getNoticias()
    noticias.value = noticias.value.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) // Ordenar por fecha descendente
  } catch (error) {
    console.error('Error al cargar las noticias:', error)
  }
}

const agregarNoticia = async () => {
  try {
    // Confirmación antes de guardar
    const result = await Swal.fire({
      title: '¿Desea grabar esta noticia?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Grabar',
      cancelButtonText: 'Cancelar'
    })

    if (!result.isConfirmed) return

    // Enviar noticia al backend
    const noticiaGuardada = await addNoticia(nuevaNoticia.value)
    noticias.value.push(noticiaGuardada)

    // Reiniciar formulario
    nuevaNoticia.value = {
      titulo: '',
      contenido: '',
      fecha: new Date().toISOString().split('T')[0],
    }

    Swal.fire('Éxito', 'Noticia agregada correctamente', 'success')
    console.log('Noticia agregada:', noticiaGuardada)
    
  } catch (error) {
    console.error('Error al agregar la noticia:', error)
  }
}

const borraNoticia = async (id) => {
  try {
    // Confirmación antes de borrar
    const result = await Swal.fire({
      title: '¿Está seguro de borrar esta noticia?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    })

    if (!result.isConfirmed) return

    await deleteNoticia(id)
    // Actualizar la lista local de noticias
    noticias.value = noticias.value.filter(noticia => noticia.id !== id)

    Swal.fire('Éxito', 'Noticia borrada correctamente', 'success')
    console.log('Noticia borrada con ID:', id)
    
  } catch (error) {
    console.error('Error al borrar la noticia:', error)
  }
}
</script>

<style scoped>
.container {
  max-width: 70%;
}
</style>
