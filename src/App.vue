<template>
  <div id="app" class="d-flex flex-column vh-100">
    <NavBar />  <!-- Fijo arriba -->
    <main class="flex-grow-1 overflow-auto">
      <GestionClientes />
    </main>
    <FooTer />  <!-- Fijo abajo -->
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import FooTer from './components/FooTer.vue'
import GestionClientes from './components/GestionClientes.vue'
</script>

<style>
#app > nav,
#app > footer {
  width: 100%;
}
</style>
