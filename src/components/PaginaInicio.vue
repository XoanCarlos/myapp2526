<template>
  <div div class="d-flex justify-content-center align-items-center mt-5 w-100">
    <transition name="fade" mode="out-in">
      <img
        :src="imagenes[indice]"
        :key="imagenes[indice]"
        class="imagen d-block mx-auto"
        alt="Imagen animada"
      />
    </transition>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import imagen1 from '../assets/foto1.webp'
import imagen2 from '../assets/foto2.webp'
import imagen3 from '../assets/foto3.webp'

const imagenes = [imagen1, imagen2, imagen3]
const indice = ref(0)
let intervalo = null

onMounted(() => {
  intervalo = setInterval(() => {
    indice.value = (indice.value + 1) % imagenes.length
  }, 4000)
})

onUnmounted(() => clearInterval(intervalo))
</script>

<style scoped>
.imagen {
  width: 80%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
}
/* clases propias de Vue */
.fade-enter-active
{
  transition: opacity 2s ease;
}
.fade-leave-active {
  transition: opacity 2s ease;
}
.fade-enter-from
{
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}
</style>

