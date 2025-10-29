<template>
  <nav class="navbar navbar-dark bg-primary sticky-top navbar-expand-lg">
    <div class="container-fluid">
      <!-- Marca o logo -->
      <a class="navbar-logo ms-5" href="/"><img src="../assets/logo.svg" alt="Logo" width="48px" height="28px"/></a>

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
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
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
            <router-link to="#" class="nav-link">Ventas</router-link>
          </li>
          <li class="nav-item">
            <router-link to="#" class="nav-link">Contacto</router-link>
          </li>
          </ul>
          <ul class="navbar-nav ms-end">
           <li class="nav-item">
            <router-link to="#" class="nav-link justify-content-end"><i class="bi bi-person fs-4 me-5"></i></router-link>
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
