<template>
  <nav class="navbar navbar-dark bg-primary sticky-top navbar-expand-lg">
    <div class="container-fluid">
      <!-- Marca o logo -->
      <a class="navbar-logo ms-3" href="/"><img src="../assets/logo.svg" alt="Logo" width="64px" height="32px"/></a>

      <!-- Botón hamburguesa -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Enlaces centrados -->
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/clientes" class="nav-link">Clientes</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/noticias" class="nav-link">Noticias</router-link>
          </li>
          <li class="nav-item">
            <router-link to="#" class="nav-link">Modelos</router-link>
          </li>
          <li class="nav-item">
            <router-link to="#" class="nav-link">Contacto</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script setup>
// No necesitas nada aquí si no tienes lógica.
</script>

<style>
.navbar-dark .nav-link {
  color: rgba(255, 255, 255, 0.9);
}
.navbar-dark .nav-link:hover,
.navbar-dark .nav-link:focus {
  color: #fff;
}
</style>
