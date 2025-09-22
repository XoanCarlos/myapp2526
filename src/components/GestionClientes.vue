<template>
  <div class="gestion-clientes">
    <h2 class="text-center my-4">Gestión de Clientes</h2>

    <!-- Formulario -->

<form @submit.prevent="agregarCliente" class="mb-5">
<div class="mb-4 d-flex align-items-center gap-1">
  <!-- DNI -->
  <label for="dni" class="me-4 mb-0 ms-2" style="width: 60px;">DNI:</label>
  <input type="text" id="dni" v-model="nuevoCliente.dni" class="form-control me-3" style="max-width: 180px;" required />

  <!-- Espacio vacío (50% de la fila) -->
  <div class="flex-grow-1"></div>

  <!-- Fecha de Alta -->
  <label for="fechaAlta" class="me-6 mb-0" style="width: 150px;">Fecha de Alta:</label>
  <input type="date" id="fechaAlta" v-model="nuevoCliente.fechaAlta" class="form-control" style="max-width: 180px;" />
</div>


  <!-- Nombre y Apellidos -->
  <div class="mb-4 d-flex gap-4">
    <label for="nombre" class="form-label ms-2" style="width: 120px;">Nombre:</label>
    <input type="text" id="nombre" v-model="nuevoCliente.nombre" class="form-control" required />
    <label for="apellidos" class="form-label ms-2">Apellidos:</label>
    <input type="text" id="apellidos" v-model="nuevoCliente.apellidos" class="form-control" required />
  </div>

  <!-- Email y Móvil -->
  <div class="mb-4 d-flex align-items-center">
    <label for="email" class="form-label ms-2 mb-0" style="width: 122px;">Email:</label>
    <input type="email" id="email" v-model="nuevoCliente.email" class="form-control w-50" required />
    <div class="w-50"></div>
    <label for="movil" class="me-2 ms-2 mb-0" style="width: 100px;">Móvil:</label>
    <input type="tel" id="movil" v-model="nuevoCliente.movil" class="form-control w-25" />
  </div>

  <!-- Dirección, Provincia y Municipio -->
  <div class="mb-4 d-flex align-items-center gap-2">
    <label for="direccion" class="me-2 ms-2 mb-0">Dirección:</label>
    <input type="text" id="direccion" v-model="nuevoCliente.direccion" class="form-control w-50" />
    <label for="provincia" class="form-label ms-2 mb-0">Provincia:</label>
    <select id="provincia" v-model="nuevoCliente.provincia" class="form-select w-25" @change="filtrarMunicipios">
      <option disabled value="">Seleccione provincia</option>
      <option v-for="prov in provincias" :key="prov" :value="prov">{{ prov }}</option>
    </select>
    <label for="municipio" class="form-label ms-2 mb-0">Municipio:</label>
    <select id="municipio" v-model="nuevoCliente.municipio" class="form-select w-25">
      <option disabled value="">Seleccione municipio</option>
      <option v-for="mun in municipiosFiltrados" :key="mun" :value="mun">{{ mun }}</option>
    </select>
  </div>

  <!-- Histórico -->
  <div class="d-flex justify-content-end mb-3">
    <input type="checkbox" id="historico" v-model="nuevoCliente.historico" class="form-check-input" />
    <label for="historico" class="form-check-label">Histórico</label>
  </div>

  <!-- Botón centrado -->
  <div class="text-center">
    <button type="submit" class="btn btn-primary">Grabar</button>
  </div>

</form>
    <!-- Lista de Clientes -->
    <div class="table-responsive">
      <h3>Lista de Clientes</h3>
      <table class="table table-bordered table-striped w-100">
        <thead class="table-primary">
          <tr >
            <th class="text-center">ID</th>
            <th class="text-center">Apellidos</th>
            <th class="text-center">Nombre</th>
            <th class="text-center">Móvil</th>
            <th class="text-center">Municipio</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cliente, index) in clientes" :key="index" >
            <th scope="row" class="text-center">{{ index + 1 }}</th>
            <td >{{ cliente.apellidos }}</td>
            <td >{{ cliente.nombre }}</td>
            <td class="text-center">{{ cliente.movil }}</td>
            <td class="text-center">{{ cliente.municipio }}</td>
            <td class="align-middle text-center">
              <button
                @click="eliminarCliente(index)"
                class="btn btn-danger btn-sm">
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

const nuevoCliente = ref({
  dni: '',
  nombre: '',
  apellidos: '',
  email: '',
  movil: '',
  direccion: '',
  provincia: '',
  municipio: '',
  fechaAlta: '',
  historico: false
});

const clientes = ref([]);

const agregarCliente = () => {
  clientes.value.push({ ...nuevoCliente.value });
  // Reiniciar el formulario
  nuevoCliente.value = {
    dni: '',
    nombre: '',
    apellidos: '',
    email: '',
    movil: '',
    direccion: '',
    provincia: '',
    municipio: '',
    fechaAlta: '',
    historico: false
  };
};

const eliminarCliente = (index) => {
  clientes.value.splice(index, 1);
};
</script>

<style scoped>
.gestion-clientes {
  width: 95%;
  max-width: none;
  
}

.form-control {
  width: 100%;
}
</style>
