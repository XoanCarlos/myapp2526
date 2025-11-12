<template>
  <div class="container-fluid my-3 p-2 border rounded-0 shadow-sm bg-light">
    <h5 class="text-center bg-primary-subtle  ms-1 py-1"><i class="bi bi-car-front me-2"></i>Registro de Vehículos </h5>
    <form @submit.prevent="guardarVehiculo" class="mb-2 mt-1 ms-1">
      <!-- FILA: Tipo, Marca, Modelo -->
      <div class="row g-3 align-items-center mt-1">
        <div class="col-12 col-md-3 d-flex align-items-center">
          <label class="form-label mb-0 me-2 text-nowrap">Tipo:</label>
          <div class="d-flex align-items-center">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="tipo-coche" value="coche" v-model="vehiculo.tipo">
              <label class="form-check-label" for="tipo-coche">Coche</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="tipo-furgoneta" value="furgoneta" v-model="vehiculo.tipo">
              <label class="form-check-label" for="tipo-furgoneta">Furgoneta</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="tipo-moto" value="moto" v-model="vehiculo.tipo">
              <label class="form-check-label" for="tipo-moto">Moto</label>
            </div>
          </div>
        </div>
         <div class="col-12 col-md-2 d-flex align-items-center">
          <label for="color" class="form-label mb-0 me-2 text-nowrap ms-2">Matricula:</label>
          <input type="text" id="color" v-model="vehiculo.matricula" class="form-control rounded-0 shadow-none border">
        </div>

        <div class="col-12 col-md-2 d-flex align-items-center ms-2">
          <label for="marca" class="form-label mb-0 me-2 text-nowrap">Marca:</label>
          <input type="text" id="marca" v-model="vehiculo.marca" class="form-control rounded-0 shadow-none border" required>
        </div>

        <div class="col-12 col-md-2 d-flex align-items-center">
          <label for="modelo" class="form-label mb-0 me-2 text-nowrap">Modelo:</label>
          <input type="text" id="modelo" v-model="vehiculo.modelo" class="form-control rounded-0 shadow-none border" required>
        </div>
        <div class="col-12 col-md-1 d-flex align-items-center">
          <label for="anio" class="form-label mb-0 me-1 text-nowrap text-end">Año:</label>
          <input type="text" id="anio" v-model="vehiculo.anio" class="form-control text-center rounded-0 shadow-none border" required>
        </div>
         <div class="col-12 col-md-1 d-flex align-items-center">
          <label class="form-label mb-0 me-2 text-nowrap">Estado:</label>
          <select v-model="vehiculo.estado" class="form-select d-inline-block w-auto rounded-0 shadow-none border">
            <option value="disponible">Disponible</option>
            <option value="vendido">Vendido</option>
            <option value="reservado">Reservado</option>
          </select>
        </div>
      </div>

      <!-- FILA: Año, Kilómetros, Precio -->
      <div class="row g-3 align-items-center mt-2">
        

        <div class="col-12 col-md-2 d-flex align-items-center">
          <label for="kilometros" class="form-label mb-0 me-2 text-nowrap">Kilómetros:</label>
          <input type="text" id="kilometros" v-model="vehiculo.kilometros" class="form-control text-end rounded-0 shadow-none border" required>
        </div>

        <div class="col-12 col-md-2 d-flex align-items-center">
          <label for="precio" class="form-label mb-0 me-2 text-nowrap">Precio (€):</label>
          <input type="text" id="precio" v-model="vehiculo.precio" class="form-control text-end rounded-0 shadow-none border" required>
        </div>
 
        <div class="col-12 col-md-3 d-flex align-items-center">
          <label for="combustible" class="form-label mb-0 me-2 text-nowrap">Combustible:</label>
          <select id="combustible" v-model="vehiculo.combustible" class="form-select rounded-0 shadow-none border">
            <option disabled value="">Seleccione</option>
            <option>Gasolina</option>
            <option>Diésel</option>
            <option>Híbrido</option>
            <option>GLP</option>
            <option>Eléctrico</option>
          </select>
        </div>
         <div class="col-12 col-md-3 d-flex align-items-center">
          <label for="transmision" class="form-label mb-0 ms-2 me-2 text-nowrap">Transmisión:</label>
          <div class="d-flex align-items-center">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="tipo-automatica" value="automatica" v-model="vehiculo.transmision">
              <label class="form-check-label" for="tipo-automatica">Automatica</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" id="tipo-manual" value="manual" v-model="vehiculo.transmision">
              <label class="form-check-label" for="tipo-manual">Manual</label>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-2 d-flex align-items-center">
          <label for="potencia" class="form-label mb-0 me-2 text-nowrap">Potencia (CV):</label>
          <input type="text" id="potencia" v-model="vehiculo.potencia_cv" class="form-control rounded-0 me-2 shadow-none border">
        </div>     
      </div>

      <!-- FILA: Descripción -->
      <div class="row g-2 mt-3">
        <div class="col">
          <label for="descripcion" class="form-label mb-0 me-3 text-nowrap">Descripción:</label>
          <textarea id="descripcion" v-model="vehiculo.descripcion" rows="3" class="form-control rounded-0 shadow-none border mt-2 mb-4" placeholder="Describe el estado, potencia, color, revisiones, etc."></textarea>
        </div>
      </div>
<h5 class="text-center bg-primary-subtle py-1"><i class="bi bi-person me-2"></i>Cliente Ubicación</h5>
      <!-- FILA: Ubicación -->
      <div class="row g-3 align-items-center mt-3">
        <div class="col-12 col-md-3 d-flex align-items-center">
          <label for="provincia" class="form-label mb-0 me-2 text-nowrap">Provincia:</label>
          <select id="provincia" v-model="vehiculo.ubicacion.provincia" class="form-select rounded-0 shadow-none border" @change="filtrarCiudades">
            <option disabled value="">Seleccione provincia</option>
            <option v-for="prov in provincias" :key="prov.id" :value="prov.nm">{{ prov.nm }}</option>
          </select>
        </div>

        <div class="col-12 col-md-4 ms-4 d-flex align-items-center">
          <label for="ciudad" class="form-label mb-0 me-2 text-nowrap">Ciudad:</label>
          <select id="ciudad" v-model="vehiculo.ubicacion.ciudad" class="form-select rounded-0 shadow-none border">
            <option disabled value="">Seleccione ciudad</option>
            <option v-for="mun in municipiosFiltrados" :key="mun.id" :value="mun.nm">{{ mun.nm }}</option>
          </select>
        </div>

        <div class="col-12 col-md-3 ms-4 d-flex align-items-center">
          <label for="fecha_publicacion" class="form-label mb-0 me-2 text-nowrap">Fecha Publicación:</label>
          <input type="date" id="fecha_publicacion" v-model="vehiculo.fecha_publicacion" class="form-control text-center rounded-0 shadow-none border">
        </div>
      </div>

      <!-- FILA: Contacto -->
      <div class="row g-3 align-items-center mt-3">
        <div class="col-12 col-md-4 d-flex align-items-center">
          <label for="contacto_nombre" class="form-label mb-0 me-2 text-nowrap">Nombre Contacto:</label>
          <input type="text" id="contacto_nombre" v-model="vehiculo.contacto.nombre" class="form-control rounded-0 shadow-none border">
        </div>
        <div class="col-12 col-md-2 ms-4 d-flex align-items-center">
          <label for="contacto_telefono" class="form-label text-end mb-0 me-2 text-nowrap">Teléfono:</label>
          <input type="tel" id="contacto_telefono" v-model="vehiculo.contacto.telefono" class="form-control text-center rounded-0 shadow-none border">
        </div>
        <div class="col-12 col-md-4 d-flex ms-4 align-items-center">
          <label for="contacto_email" class="form-label mb-0 me-2 text-nowrap">Email:</label>
          <input type="email" id="contacto_email" v-model="vehiculo.contacto.email" class="form-control rounded-0 shadow-none border">
        </div>
      </div>

      <!-- FILA: Estado y botón -->
      <div class="row g-3 align-items-center mt-3">
        <div class="col-12 d-flex justify-content-center align-items-center">
          <button type="submit" class="btn btn-primary rounded-0 border shadow-none px-4 py-2 ">
            {{ editando ? 'Modificar' : 'Guardar' }}
          </button>
          <button type="submit" class="btn btn-primary rounded-0 border shadow-none px-4 py-2 ms-2 ">
            Eliminar
          </button>
        </div>
      </div>

    </form>
  </div>
</template>


<script setup>
import { ref, computed } from "vue"

const vehiculo = ref({
  tipo: "",
  marca: "",
  modelo: "",
  anio: "",
  kilometros: "",
  precio: "",
  matricul: "",
  combustible: "",
  transmision: "",
  potencia_cv: "",
  descripcion: "",
  ubicacion: {
    provincia: "",
    ciudad: ""
  },
  contacto: {
    nombre: "",
    telefono: "",
    email: ""
  },
  fecha_publicacion: "",
  estado: "disponible"
})

const tiposVehiculo = ref(["coche", "moto", "furgoneta", "camión"])
const tiposCombustible = ref(["gasolina", "diésel", "híbrido", "eléctrico"])

const provincias = ref([
  { id: 1, nm: "A Coruña" },
  { id: 2, nm: "Lugo" },
  { id: 3, nm: "Ourense" },
  { id: 4, nm: "Pontevedra" }
])

const municipios = ref([
  { id: 1, nm: "Santiago de Compostela", prov: "A Coruña" },
  { id: 2, nm: "Ferrol", prov: "A Coruña" },
  { id: 3, nm: "Lugo", prov: "Lugo" },
  { id: 4, nm: "Monforte de Lemos", prov: "Lugo" },
  { id: 5, nm: "Ourense", prov: "Ourense" },
  { id: 6, nm: "Vigo", prov: "Pontevedra" },
  { id: 7, nm: "Pontevedra", prov: "Pontevedra" }
])

const municipiosFiltrados = computed(() =>
  municipios.value.filter(m => m.prov === vehiculo.value.ubicacion.provincia)
)
</script>
<style></style>