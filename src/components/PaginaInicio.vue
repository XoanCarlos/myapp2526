<template>
  <div class="slideshow">
    <transition name="fade" mode="out-in">
      <img
        :src="imagenes[indice]"
        :key="imagenes[indice]"
        class="imagen"
        alt="Imagen animada"
      />
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import imagen1 from '../assets/imagen1.webp'
import imagen2 from '../assets/imagen2.webp'
import imagen3 from '../assets/imagen3.webp'

const imagenes = [imagen1, imagen2, imagen3]
const indice = ref(0)
let intervalo = null

onMounted(() => {
  intervalo = setInterval(() => {
    indice.value = (indice.value + 1) % imagenes.length
  }, 3000)
})

onUnmounted(() => clearInterval(intervalo))
</script>

<style scoped>
.slideshow {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}
.imagen {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
