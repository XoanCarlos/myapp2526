<template>
  <div class="container-fluid">
    <h2 class="text-center my-4">Gestión de Clientes</h2>
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <form @submit.prevent="agregarCliente">
          <!-- Campo DNI más pequeño y alineado a la izquierda -->
          <div class="mb-3 d-flex align-items-center">
            <label for="dni" class="form-label me-2 mb-0">DNI:</label>
            <input type="text" id="dni" v-model="nuevoCliente.dni" class="form-control form-control-sm input-dni" required />
          </div>

          <!-- Nombre y Apellidos en la misma fila -->
          <div class="mb-3 d-flex align-items-center">
            <!-- Nombre -->
            <div class="d-flex flex-column flex-md-row me-md-3" style="flex: 1;">
              <label for="nombre" class="form-label">Nombre:</label>
              <input type="text" id="nombre" v-model="nuevoCliente.nombre" class="form-control form-control-lg" required />
            </div>
            <!-- Apellidos -->
            <div class="d-flex flex-column flex-md-row" style="flex: 1;">
              <label for="apellidos" class="form-label">Apellidos:</label>
              <input type="text" id="apellidos" v-model="nuevoCliente.apellidos" class="form-control form-control-lg" required />
            </div>
          </div>

          <!-- Campo de Email -->
          <div class="mb-3 d-flex align-items-center">
            <label for="email" class="form-label me-2">Email:</label>
            <input type="email" id="email" v-model="nuevoCliente.email" class="form-control" required />
          </div>

          <button type="submit" class="btn btn-primary">Agregar Cliente</button>
        </form>
      </div>
    </div>

   <!-- Lista de Clientes -->
<div class="row mt-4">
  <div class="col-12">
    <h3>Lista de Clientes</h3>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellidos</th>
          <th scope="col">Email</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cliente, index) in clientes" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.apellidos }}</td>
          <td>{{ cliente.email }}</td>
          <td>
            <button @click="eliminarCliente(index)" class="btn btn-danger btn-sm">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const nuevoCliente = ref({
  dni: '',  
  nombre: '',
  apellidos: '',
  email: ''
});
const clientes = ref([]);

const agregarCliente = () => {
  // Agregar el nuevo cliente
  clientes.value.push({ ...nuevoCliente.value });
  // Limpiar formulario después de agregar
  nuevoCliente.value = { dni: '', nombre: '', apellidos: '', email: '' };
};

const eliminarCliente = (index) => {
  clientes.value.splice(index, 1);
};
</script>

<style scoped>
.container-fluid {
  padding: 2rem;
}

.row {
  display: flex;
  justify-content: center;
}

/* Hacer el formulario más ancho */
.col-md-8, .col-lg-6 {
  max-width: 1000px; /* Definir un tamaño máximo más ancho */
  width: 100%;
}

/* Estilo para el campo DNI más pequeño y alineado a la izquierda */
.input-dni {
  font-size: 0.875rem; /* Reducir el tamaño de la fuente */
  padding: 0.375rem 0.75rem; /* Reducir padding */
  width: 20%; /* Hacer más estrecho el campo DNI */
}

/* Ajustes para los campos de Nombre y Apellidos en la misma fila */
.d-flex {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.d-flex .form-label {
  margin-right: 10px;
  margin-bottom: 0; /* Para que el label no tenga espacio debajo */
}

.d-flex div {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.form-control-lg {
  width: 100%; /* Asegura que los inputs ocupen todo el ancho disponible */
}
</style>
