<template>
  <div class="container my-1 p-3 border rounded-0 shadow-sm bg-light">
    <h4 class="text-center my-1 bg-primary-subtle py-1">Registro de Clientes</h4>

    <form @submit.prevent="guardarCliente" class="mb-4">
      <!-- FILA DNI y Fecha de Alta -->
      <div class="row g-3 align-items-center">
        <div class="col-12 col-md-3 d-flex align-items-center">
          <label for="dni" class="form-label mb-0 me-4 text-nowrap align-middle">DNI:</label>
          <div class="flex-grow-1 d-flex ms-4 align-items-center">
            <input
              type="text"
              id="dni"
              v-model="nuevoCliente.dni"
              @blur="validarDni"
              class="form-control text-center"
              :class="{ 'is-invalid': !dniValido }"
              required
            />
            <button
              type="button"
              class="btn btn-primary ms-3 rounded-0 border shadow-none d-flex align-items-center justify-content-"
              @click="buscarClientePorDNI(nuevoCliente.dni)"
            >
              <i class="bi bi-search"></i>
            </button>
          </div>
          <div v-if="!dniValido" class="invalid-feedback d-block">
            DNI o NIE inválido.
          </div>
        </div>

        <!--  Fecha de Alta a la derecha  con ms-auto y d-flex-->
        <div class="col-12 col-md-3 d-flex align-items-center ms-auto">
          <label for="fecha_alta" class="form-label mb-0 me-2 text-nowrap align-middle">Fecha de Alta:</label>
          <input
            type="date"
            id="fecha_alta"
            v-model="nuevoCliente.fecha_alta"
            class="form-control text-center"
            required
          />
        </div>
      </div>


      <!-- FILA Nombre y Apellidos -->
      <div class="row g-3 align-items-center mt-2">
        <div class="col-12 col-md-6 d-flex align-items-center">
          <label for="nombre" class="form-label mb-0 me-2 text-nowrap align-middle">Nombre: </label>
          <input
            type="text"
            id="nombre"
            v-model="nuevoCliente.nombre"
            class="form-control ms-2"
            @blur="capitalizarTexto('nombre')"
            required
          />
        </div>

        <div class="col-12 col-md-6 d-flex align-items-center">
          <label for="apellidos" class="form-label mb-0 me-2 text-nowrap align-middle">Apellidos: </label>
          <input
            type="text"
            id="apellidos"
            v-model="nuevoCliente.apellidos"
            class="form-control"
            @blur="capitalizarTexto('apellidos')"
            required
          />
        </div>
      </div>

      <!-- FILA Email y Móvil -->
      <div class="row g-3 align-items-center mt-2">
        <div class="col-12 col-md-5 d-flex align-items-center">
          <label for="email" class="form-label mb-0 me-3 text-nowrap align-middle">Email:</label>
          <input
            type="email"
            id="email"
            v-model="nuevoCliente.email"
            class="form-control ms-4 text-center"
            @blur="validarEmail"
            :class="{ 'is-invalid': !emailValido }"
            required
          />
        </div>

        <div class="col-12 col-md-3 d-flex align-items-center">
          <label for="movil" class="form-label mb-0 ms-3 me-2 text-nowrap align-middle">Móvil:</label>
          <input
            type="tel"
            id="movil"
            v-model="nuevoCliente.movil"
            class="form-control text-center"
            @blur="validarMovil"
            :class="{ 'is-invalid': !movilValido }"
            required
          />
        </div>
      </div>

      <!-- FILA Dirección, Provincia y Municipio -->
      <div class="row g-3 align-items-center mt-2">
        <div class="col-12 col-md-5 d-flex align-items-center">
          <label for="direccion" class="form-label mb-0 me-2 text-nowrap align-middle">Dirección:</label>
          <input
            type="text"
            id="direccion"
            v-model="nuevoCliente.direccion"
            class="form-control ms-2"
            @blur="capitalizarTexto('direccion')"
          />
        </div>

        <div class="col-12 col-md-3 d-flex align-items-center">
          <label for="provincia" class="form-label mb-0 me-2 text-nowrap align-middle">Provincia:</label>
          <select
            id="provincia"
            v-model="nuevoCliente.provincia"
            class="form-select"
            @change="filtrarMunicipios"
          >
            <option disabled value="">Seleccione provincia</option>
            <option v-for="prov in provincias" :key="prov.id" :value="prov.nm">
              {{ prov.nm }}
            </option>
          </select>
        </div>

        <div class="col-12 col-md-4 d-flex align-items-center">
          <label for="municipio" class="form-label mb-0 me-2 text-nowrap align-middle">Municipio:</label>
          <select
            id="municipio"
            v-model="nuevoCliente.municipio"
            class="form-select"
          >
            <option disabled value="">Seleccione municipio</option>
            <option v-for="mun in municipiosFiltrados" :key="mun.id" :value="mun.nm">
              {{ mun.nm }}
            </option>
          </select>
        </div>
      </div>

     <!-- Botón centrado y checkbox al final -->
      <div class="d-flex align-items-center mt-3">
        <!-- Espacio izquierdo para centrar el botón -->
        <div class="flex-grow-1 d-flex justify-content-center">
          <button type="submit" class="btn btn-primary px-3 rounded-0 border shadow-none">
            {{ editando ? 'Modificar Cliente' : 'Guardar Cliente' }}
          </button>
        </div>

        <!-- Checkbox al final -->
        <div class="form-check form-switch ms-2">
          <input
            type="checkbox"
            id="historico"
            v-model="mostrarHistorico"
            class="form-check-input"
            @change="cargarClientes"
          />
          <label for="historico" class="form-check-label ms-2">Histórico</label>
        </div>
      </div>
   </form>


    <!-- Tabla de clientes -->
    <div class="table-responsive mt-4">
      <h5 class="text-center mb-3">Listado de Clientes</h5>
      <table class="table table-bordered table-striped table-hover align-middle">
        <thead class="table-primary text-center">
          <tr>
            <th>ID</th>
            <th>Apellidos</th>
            <th>Nombre</th>
            <th>Móvil</th>
            <th>Municipio</th>
            <th style="width: 150px;">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cliente, index) in clientes" :key="cliente.id || index">
            <th scope="row" class="text-center">{{ index + 1 }}</th>
            <td>{{ cliente.apellidos }}</td>
            <td>{{ cliente.nombre }}</td>
            <td class="text-center">{{ cliente.movil }}</td>
            <td class="text-center">{{ cliente.municipio }}</td>
            <td class="text-start">
              <button class="btn btn-danger btn-sm ms-3 me-2" @click="eliminarCliente(cliente.movil)">
                <i class="bi bi-trash"></i>
              </button>
              <button class="btn btn-warning btn-sm" @click="editarCliente(cliente.movil)">
                <i class="bi bi-pencil"></i>
              </button>
              <button
                v-if="cliente.historico === false"
                class="btn btn-secondary btn-sm ms-2"
                @click="activarCliente(cliente)"
              >
                <i class="bi bi-unlock-fill"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Navegación de página-->
       <div class="d-flex justify-content-center my-3">
        <button class="btn btn-outline-primary btn-sm me-2" disabled>
          <i class="bi bi-chevron-left"></i> Anterior
        </button>
        <span class="mx-3 align-self-center">Página {{ currentPage  }}</span>
        <button class="btn btn-outline-primary btn-sm" disabled>
          Siguiente <i class="bi bi-chevron-right"></i>
        </button>
       </div>
    </div>
  </div>
</template>

<script setup>
import provmuniData from '@/data/provmuni.json';
import { ref, onMounted } from 'vue'
import { getClientes, addCliente, deleteCliente, updateCliente, getClientePorDni } from '@/api/clientes.js'
import Swal from 'sweetalert2';

///////////////////// SCRIPTS CRUD ////////////////////////

const nuevoCliente = ref({
  dni: '',
  nombre: '',
  apellidos: '',
  email: '',
  movil: '',
  direccion: '',
  provincia: '',
  municipio: '',
  fecha_alta: '',
  historico: true
});


// Declaraciones de estado o variables reactivas
const editando = ref(false);  // Estado de edición para el formulario para usar el mismo botón
const clienteEditandoId = ref(null);
const mostrarHistorico = ref(false); // Control Estado del checkbox
const clientes = ref([])   // Array de clientes cargados desde la "API"
const numclientes = ref(0) // Número total de clientes (para paginación)
const currentPage = ref(1); // Página actual (para paginación)
const clientesPorPage = 10; // Número de clientes por página (para paginación


// Zona Cargar clientes Al Montar el componente 
onMounted(async () => {
  cargarClientes()
})

const cargarClientes = () => {
  getClientes(mostrarHistorico.value).then(data => {
    clientes.value = data
    numclientes.value = data.length  // Actualiza el número total de clientes
    currentPage.value = 1; // Reiniciar a la primera página al cargar
  })
  Swal.fire({
    icon: 'success',
    title: "Listando Clientes...",
    showConfirmButton: false,
    timer: 1500
    });
}

const guardarCliente = async () => {
  // Validar duplicados solo si estás creando (no si editando)

  if (!editando.value) {
    const duplicado = clientes.value.find(cliente =>
      cliente.dni === nuevoCliente.value.dni ||
      cliente.movil === nuevoCliente.value.movil ||
      cliente.email === nuevoCliente.value.email
    );
    if (duplicado) {
      Swal.fire({
        icon: 'error',
        title: 'DNI, móvil o email duplicados',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
  }
  
  // Confirmación antes de guardar
  const result = await Swal.fire({
    title: editando.value ? '¿Desea modificar este cliente?' : '¿Desea grabar este cliente?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: editando.value ? 'Modificar' : 'Grabar',
    cancelButtonText: 'Cancelar'
  });

  if (!result.isConfirmed) return;
 
  try {
    if (editando.value) {
      // Validar campos
      // Modificar cliente (PUT)+
     
      const clienteActualizado = await updateCliente(clienteEditandoId.value, nuevoCliente.value);
      
      // Actualiza el cliente en la lista local
      const index = clientes.value.findIndex(c => c.id === clienteEditandoId.value);
      if (index !== -1) clientes.value[index] = clienteActualizado;
      Swal.fire({
        icon: 'success',
        title: 'Cliente modificado',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      // Agregar cliente (POST)
    
      const clienteAgregado = await addCliente(nuevoCliente.value);
      clientes.value.push(clienteAgregado);
      Swal.fire({
        icon: 'success',
        title: 'Cliente agregado',
        showConfirmButton: false,
        timer: 1500
      });
    }

    // Reset formulario y estado
    nuevoCliente.value = {
      dni: '',
      nombre: '',
      apellidos: '',
      email: '',
      movil: '',
      direccion: '',
      provincia: '',
      municipio: '',
      fecha_alta: '',
      historico: true
    };

    editando.value = false;
    clienteEditandoId.value = null;

    // Reset validaciones si tienes (dniValido, movilValido, etc)
    dniValido.value = true;
    movilValido.value = true;
    emailValido.value = true;

    // Refrescar lista completa (opcional)
    clientes.value = await getClientes();

  } catch (error) {
    console.error('Error al guardar cliente:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al guardar cliente',
      text: 'Inténtelo de nuevo o contacte con el administrador.',
      showConfirmButton: false,
      timer: 1500
    });
  }
};


// Funcion Eliminar Cliente con patch (histórico a false)
const eliminarCliente = async (movil) => {
  // Refrescar lista desde la API
  clientes.value = await getClientes();
  // Buscar cliente completo (que incluye el ID)
  const clienteAEliminar = clientes.value.find(cliente => cliente.movil === movil);

  if (!clienteAEliminar) {
    Swal.fire({
      icon: 'error',
      title: 'Cliente no encontrado',
      showConfirmButton: false,
      timer: 1500
    });
    return;
  }

  // Pedir confirmación antes de eliminar
  const result = await Swal.fire({
    title: `¿Eliminar al cliente ${clienteAEliminar.nombre} ${clienteAEliminar.apellidos}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });


  // Si no confirma, salir
  if (!result.isConfirmed) return;

  // Si confirma, eliminar cliente usando la API y movil como ID
  await deleteCliente(clienteAEliminar.id);
  // Refrescar la lista desde la "API"
  clientes.value = await getClientes();

  Swal.fire({
    icon: 'success',
    title: 'Cliente eliminado',
    showConfirmButton: false,
    timer: 1500
  });
};


// Función Editar Cliente (carga datos en el formulario)
const editarCliente = (movil) => {
  const cliente = clientes.value.find(c => c.movil === movil);
 
  if (!cliente) {
    Swal.fire({
      icon: 'error',
      title: 'Cliente no encontrado',
      showConfirmButton: false,
      timer: 1500
    });
    return;
  }

  // Copiar datos al formulario
  nuevoCliente.value = { ...cliente }; // 🔁 Aquí cargas el formulario con los datos
  nuevoCliente.value.fecha_alta = formatearFechaParaInput(cliente.fecha_alta);  
  editando.value = true;
  // Formatear fecha para el input type="date"

  // Actualiza municipios filtrados según la provincia seleccionada
  filtrarMunicipios();
  nuevoCliente.value.municipio = cliente.municipio;  // 🟢 Ahora estamos en modo edición
  clienteEditandoId.value = cliente.id;
};

// Función para activar cliente (poner historico en true)
const activarCliente = async (cliente) => {
  const confirmacion = await Swal.fire({
    title: `¿Activar cliente ${cliente.nombre} ${cliente.apellidos}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Activar',
    cancelButtonText: 'Cancelar'
  });

  if (!confirmacion.isConfirmed) return;

  try {
    // Crear una copia del cliente con historico en true
    const clienteActivado = { ...cliente, historico: true };

    // Llamar a la API para actualizar
    const actualizado = await updateCliente(cliente.id, clienteActivado);

    // Actualizar la lista local (opcional, también puedes volver a cargar todo)
    const index = clientes.value.findIndex(c => c.id === cliente.id);
    if (index !== -1) {
      clientes.value[index] = actualizado;
    }

    Swal.fire({
      icon: 'success',
      title: 'Cliente reactivado',
      showConfirmButton: false,
      timer: 1500
    });

    // Recargar lista actualizada
    await cargarClientes();

  } catch (error) {
    console.error('Error al reactivar cliente:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al activar cliente',
      text: 'Por favor, intenta de nuevo.',
      timer: 1500
    });
  }
};

const buscarClientePorDNI = async (dni) => {
  if (!dni || dni.trim() === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Debe introducir un DNI antes de buscar.',
      timer: 1500,
      showConfirmButton: false
    });
    return;
  }

  try {
    const cliente = await getClientePorDni(dni.trim().toUpperCase());

    if (!cliente) {
      Swal.fire({
        icon: 'info',
        title: 'Cliente no encontrado',
        text: 'No existe ningún cliente con ese DNI.',
        timer: 1500,
        showConfirmButton: false
      });
      return;
    }

    // ✅ Cargar los datos en el formulario
    nuevoCliente.value = { ...cliente };
    nuevoCliente.value.fecha_alta = formatearFechaParaInput(cliente.fecha_alta);

    // Actualiza lista de municipios si cambia la provincia
    filtrarMunicipios();
    nuevoCliente.value.municipio = cliente.municipio;
    //opcional
    editando.value = true;
    clienteEditandoId.value = cliente.id;

    Swal.fire({
      icon: 'success',
      title: 'Cliente encontrado y cargado',
      timer: 1500,
      showConfirmButton: false
    });
  } catch (error) {
    console.error('Error buscando cliente por DNI:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al buscar cliente',
      text: 'Verifique la conexión o contacte con el administrador.',
      timer: 2000,
      showConfirmButton: false
    });
  }
};

/////////////// SCRIPTS AUXILIARES ////////////////

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
  nuevoCliente.value.dni = nuevoCliente.value.dni.trim().toUpperCase();
  dniValido.value = validarDniNie(nuevoCliente.value.dni);
   // Actualiza el estado de validez
  
};

// Función única: capitaliza y asigna en el mismo paso
const capitalizarTexto = (campo) => {
  const texto = nuevoCliente.value[campo] ?? '';
  nuevoCliente.value[campo] = texto
    .toLowerCase()
    .split(' ')
    .map(palabra => {
      if (!palabra) return '';
      return palabra.charAt(0).toLocaleUpperCase() + palabra.slice(1);
    })
    .join(' ');
};

// Control móvil
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
  if (email === '') {
    emailValido.value = true; // Vacío = válido (opcional)
    return true;
  }
  const email = nuevoCliente.value.email.trim();
  // Expresión simple para email válido
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  emailValido.value = regex.test(email);
};

// Provincias y municipios

const provincias = ref(provmuniData.provincias); // Array de provincias
const municipios = ref(provmuniData.municipios); // Array de municipios para filtrarlos
const municipiosFiltrados = ref([]);  // vacío pero contendrá los municipios filtrados

const filtrarMunicipios = () => {
  // nombre de la provincia elegida en el <select>
  const nombreProv = nuevoCliente.value.provincia;

  //  buscar en provincias el objeto con ese nombre
  const prov = provincias.value.find(p => p.nm === nombreProv);
  if (!prov) {
    municipiosFiltrados.value = [];
    return;
  }

  //  los dos primeros dígitos del id de la provincia
  const codigoProv = prov.id.slice(0, 2);

  // filtrar los municipios cuyo id empiece por esos dos dígitos
  municipiosFiltrados.value = municipios.value.filter(
    m => m.id.startsWith(codigoProv)
  );

  //  opcional: resetear el municipio si ya no corresponde
  nuevoCliente.value.municipio = '';
};

function formatearFechaParaInput(fecha) {
  if (!fecha) return '';

  // Detecta formato dd/mm/yyyy
  if (fecha.includes('/')) {
    const [dd, mm, yyyy] = fecha.split('/');
    return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
  }

  // Detecta formato yyyy-mm-dd
  if (fecha.includes('-')) {
    const partes = fecha.split('-');
    if (partes.length === 3) return fecha; // ya formato ISO
  }

  return '';
}

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
