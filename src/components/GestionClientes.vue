<template>
  <div class="gestion-clientes">
    <h2 class="text-center my-4">Gestión de Clientes</h2>

    <!-- Formulario -->
    <form @submit.prevent="agregarCliente" class="mb-5">
      <!-- DNI -->
      <div class="mb-3 d-flex align-items-center">
        <label for="dni" class="me-2 mb-0" style="width: 80px;">DNI:</label>
        <input
          type="text"
          id="dni"
          v-model="nuevoCliente.dni"
          class="form-control"
          required
        />
      </div>

      <!-- Nombre y Apellidos -->
      <div class="mb-3 d-flex gap-3">
        <div class="flex-fill">
          <label for="nombre" class="form-label">Nombre:</label>
          <input
            type="text"
            id="nombre"
            v-model="nuevoCliente.nombre"
            class="form-control"
            required
          />
        </div>
        <div class="flex-fill">
          <label for="apellidos" class="form-label">Apellidos:</label>
          <input
            type="text"
            id="apellidos"
            v-model="nuevoCliente.apellidos"
            class="form-control"
            required
          />
        </div>
      </div>

      <!-- Email -->
      <div class="mb-3 d-flex align-items-center">
        <label for="email" class="me-2 mb-0" style="width: 80px;">Email:</label>
        <input
          type="email"
          id="email"
          v-model="nuevoCliente.email"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary">Grabar</button>
    </form>

    <!-- Lista de Clientes -->
    <div class="table-responsive">
      <h3>Lista de Clientes</h3>
      <table class="table table-bordered table-striped w-100">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cliente, index) in clientes" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ cliente.nombre }}</td>
            <td>{{ cliente.apellidos }}</td>
            <td>{{ cliente.email }}</td>
            <td>
              <button @click="eliminarCliente(index)" class="btn btn-danger btn-sm">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const nuevoCliente = ref({ dni: '', nombre: '', apellidos: '', email: '' });
const clientes = ref([]);

const agregarCliente = () => {
  clientes.value.push({ ...nuevoCliente.value });
  nuevoCliente.value = { dni: '', nombre: '', apellidos: '', email: '' };
};

const eliminarCliente = (index) => {
  clientes.value.splice(index, 1);
};
</script>

<style scoped>
.gestion-clientes {
  width: 95%;       /* casi todo el ancho de la pantalla */
  max-width: none;  /* quitar límites máximos */
  margin: 0 auto;   /* centrado horizontal */
  padding: 2rem 0;
}

.form-control {
  width: 100%;      /* inputs ocupan todo el ancho de su contenedor */
}
</style>
