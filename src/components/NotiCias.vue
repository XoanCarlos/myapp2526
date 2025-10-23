<template>
  <div class="container d-flex flex-column mt-2 w-100">
    <!-- Título centrado -->
    <div class="text-center mb-2 w-100">
      <h4 class="text-primary fw-bold ms-5">Noticias del Motor</h4>
    </div>

    <form @submit.prevent="agregarNoticia" class="w-100">
      <!-- Fila 1: Título -->
      <div class="row g-2 align-items-center mb-2">
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

      <!-- Fila 3: Textarea (alineado con el label) -->
      <div class="row g-3 mb-2 align-items-start">
        
        <div class="col-md-12">
          <textarea
            id="contenido"
            v-model="nuevaNoticiacontenido"
            class="form-control border-primary rounded-0"
            maxlength="256"
            rows="4"
            placeholder="máximo 256 caracteres"
          ></textarea>
        </div>
      </div>

      <!-- Fila 4: Botón centrado -->
      <div class="row g-3 mt-2">
        <div class="col text-center">
          <button type="submit" class="btn btn-primary px-4">
            Agregar Noticia
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const nuevaNoticia = ref({
  titulo: '',
  contenido: ''
});

const agregarNoticia = async () => {
    try {

  // Lógica para agregar la noticia usando la API
    console.log('Noticia agregada:', nuevaNoticia.value);
  } catch (error) {
    console.error('Error al agregar la noticia:', error);
  }
};
</script>

<style scoped>
</style>
