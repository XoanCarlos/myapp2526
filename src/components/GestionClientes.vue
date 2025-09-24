<template>
 <div
  class="gestion-clientes mx-auto mt-4 p-4 pb-5 border rounded-3 shadow-sm min-vh-75 bg-light">
    <h3 class="text-center my-2">Gestión de Clientes</h3>
    <!-- Formulario -->
<form @submit.prevent="agregarCliente" class="mb-4">
<!-- DNI con validación visual -->
<div class="mb-3 row align-items-center">
  <!-- Columna DNI -->
  <div class="col-md-4 d-flex align-items-center">
    <label for="dni" class="form-label me-2 mb-0">DNI:  </label>
    <div class="flex-grow-1">
      <input
        type="text"
        id="dni"
        v-model="nuevoCliente.dni"
        @blur="validarDni"
        class="form-control w-auto"
        :class="{ 'is-invalid': !dniValido }"
        required
      />
      <div v-if="!dniValido" class="invalid-feedback">
        DNI o NIE inválido.
      </div>
    </div>
  </div>

  <!-- Columna Fecha de Alta a la derecha -->
  <div class="col-md-4 ms-auto d-flex align-items-center justify-content-end">
    <label for="fechaAlta" class="form-label me-2 mb-0 text-nowrap">Fecha de Alta:</label>
    <input
      type="date"
      id="fechaAlta"
      v-model="nuevoCliente.fechaAlta"
      class="form-control w-auto"
    />
  </div>
</div>

<!-- Nombre y Apellidos -->
<div class="mb-3 row g-3 align-items-center">
  <div class="col-md-3 d-flex align-items-center">
    <label for="nombre" class="form-label me-2 mb-0 text-nowrap">Nombre:</label>
    <input
      type="text"
      id="nombre"
      v-model="nuevoCliente.nombre"
      class="form-control w-100"
      @blur="capitalizarNombre"
      required
    />
  </div>

  <div class="col-md-5 d-flex align-items-center">
    <label for="apellidos" class="form-label me-2 mb-0 text-nowrap">Apellidos:</label>
    <input
      type="text"
      id="apellidos"
      v-model="nuevoCliente.apellidos"
      class="form-control w-100"
      @blur="capitalizarApellidos"
      required
    />
  </div>
</div>

<!-- Email y Móvil -->
<div class="mb-3 row g-3 align-items-center">
  <div class="col-md-5 d-flex align-items-center">
    <label for="email" class="form-label me-2 mb-0 text-nowrap">Email:</label>
    <input
      type="email"
      id="email"
      v-model="nuevoCliente.email"
      class="form-control w-75"
      @blur="validarEmail"
      :class="{ 'is-invalid': !emailValido }"
      required
    />
  </div>

  <div class="col-md-3 ms-auto d-flex align-items-center justify-content-end">
    <label for="movil" class="form-label me-2 mb-0 text-nowrap">Móvil:</label>
    <input
      type="tel"
      id="movil"
      v-model="nuevoCliente.movil"
      @blur="validarMovil"
      class="form-control w-50 text-center"
      :class="{ 'is-invalid': !movilValido }"
    />
  </div>
</div>


  <!-- Dirección, Provincia y Municipio -->
  <div class="mb-3 d-flex align-items-center gap-2">
    <label for="direccion" class="form-label me-2 ms-2 mb-0">Dirección:</label>
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
  <div class="d-flex justify-content-end mb-2">
    <input type="checkbox" id="historico" v-model="nuevoCliente.historico" class="form-check-input" />
    <label for="historico" class="form-check-label ms-3 mb-0">Histórico</label>
  </div>

  <!-- Botón centrado -->
  <div class="text-center">
    <button type="submit" class="btn btn-primary">Grabar</button>
  </div>

</form>
    <!-- Lista de Clientes -->
    <div class="table-responsive">
      <h4 class="text-center w-100">Listado Clientes</h4>
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
                <i class="bi bi-trash"></i>
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

// SCRIPTS CRUD

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

// Provincias y municipios
//const provincias = ref(['Madrid', 'Barcelona', 'Valencia']);


// SCRIPTS AUXILIARES

// Estado de validez del DNI/NIE si la estructura de datos es más compleja se usa reactive
const dniValido = ref(true);  // Por defecto es válido y no muestra error al iniciar

// Función para validar DNI y NIE
const validarDniNie = (valor) => {
  const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const dniRegex = /^[0-9]{8}[A-Z]$/;
  const nieRegex = /^[XYZ][0-9]{7}[A-Z]$/;

  valor = valor.toUpperCase();

  if (dniRegex.test(valor)) {
      const numero = parseInt(valor.slice(0, 8), 10);
      const letra = valor.charAt(8);
      return letra === letras[numero % 23];  //sale con true si es válido
    } else if (nieRegex.test(valor)) {
      const nie = valor.replace('X', '0').replace('Y', '1').replace('Z', '2');
      const numero = parseInt(nie.slice(0, 8), 10);
      const letra = valor.charAt(8);
      return letra === letras[numero % 23];  //sale con true si es válido
    }
  return false; 
};

// Validar al salir del campo
const validarDni = () => {
  const dni = nuevoCliente.value.dni.trim().toUpperCase();
  dniValido.value = validarDniNie(dni);
};

// capitalizar nombre y apellidos
const capitalizarTexto = (texto) => {
  return texto
    .toLowerCase()
    .split(' ')
    .map(palabra => {
      if (palabra.length === 0) return '';
      return palabra.charAt(0).toLocaleUpperCase() + palabra.slice(1);  //toLocaleUpperCase para ñ y tildes
    })
    .join(' ');
};


// Al salir del input (nombre o apellidos)
const capitalizarNombre = () => {
  nuevoCliente.value.nombre = capitalizarTexto(nuevoCliente.value.nombre);
};

const capitalizarApellidos = () => {
  nuevoCliente.value.apellidos = capitalizarTexto(nuevoCliente.value.apellidos);
};

// control móvil


const movilValido = ref(true);

const movilRegex = /^[67]\d{8}$/;

const validarMovil = () => {
  const movil = nuevoCliente.value.movil.trim();

  if (movil === '') {
    movilValido.value = true; // Vacío = válido (opcional)
    return true;
  }

  if (movil.charAt(0) === '6' || movil.charAt(0) === '7') {
    movilValido.value = movilRegex.test(movil);
    return movilValido.value;
  } else {
    movilValido.value = false;
    return false;
  }
};

// control email 

const emailValido = ref(true);
const validarEmail = () => {
  const email = nuevoCliente.value.email.trim();
  // Expresión simple para email válido
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailValido.value = regex.test(email);
};

</script>

<style scoped>

.is-invalid {
  border-color: #f28b82 !important;
  background-color: #ffe6e6;
}
.invalid-feedback {
  display: block;
}
</style>
