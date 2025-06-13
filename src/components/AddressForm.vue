<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-bold text-gray-800">Formulario de Dirección</h2>
        <p class="text-gray-600 mt-1">
          Selecciona una ubicación en el mapa o usa tu ubicación actual
        </p>
      </div> -->

      <div class="p-6 w-full">
        <div class="lg:col-span-2 w-full">
          <LeafletMap
            :initial-position="initialPosition"
            @location-selected="handleLocationSelected"
            @user-located="handleUserLocated"
            @event-selected="handleEventSelected"
          />

          <!-- Detalles del evento seleccionado -->
          <div
            v-if="selectedEvent"
            class="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-bold text-lg text-gray-800 flex items-center">
                <svg
                  class="w-5 h-5 mr-2 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Evento Seleccionado
              </h3>
              <button
                @click="selectedEvent = null"
                class="text-gray-500 hover:text-gray-700"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div class="flex items-start">
              <div
                class="w-12 h-12 rounded-md flex items-center justify-center mr-3"
                :class="categoryColors[selectedEvent.category]"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    v-if="selectedEvent.category === 'concierto'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                  <path
                    v-if="selectedEvent.category === 'deporte'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  />
                  <path
                    v-if="selectedEvent.category === 'cultural'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                  <path
                    v-if="selectedEvent.category === 'gastronomia'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>

              <div class="flex-1">
                <h4 class="font-bold text-xl text-gray-800">
                  {{ selectedEvent.title }}
                </h4>
                <div class="flex items-center text-gray-600 mt-1">
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {{ selectedEvent.date }} • {{ selectedEvent.time }}
                </div>
                <div class="flex items-center text-gray-600 mt-1">
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {{ selectedEvent.location }}
                </div>

                <div class="mt-3 bg-blue-50 p-3 rounded-lg">
                  <p class="text-gray-700">{{ selectedEvent.description }}</p>
                </div>

                <div class="mt-4">
                  <button
                    class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Ver detalles completos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Dirección</label
          >
          <input
            v-model="formData.address"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Selecciona una ubicación en el mapa"
            readonly
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Latitud</label
            >
            <input
              v-model="formData.coordinates.lat"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              readonly
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Longitud</label
            >
            <input
              v-model="formData.coordinates.lng"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              readonly
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Detalles adicionales</label
          >
          <input
            v-model="formData.details"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Piso, departamento, etc."
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Ciudad</label
          >
          <input
            v-model="formData.city"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Código Postal</label
          >
          <input
            v-model="formData.postalCode"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          @click="submitForm"
          class="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mt-4"
        >
          Guardar Dirección
        </button> -->
      </div>
    </div>

    <div
      v-if="formData.address"
      class="bg-blue-50 border-t border-blue-200 p-4"
    >
      <div class="flex items-start">
        <svg
          class="h-5 w-5 text-blue-500 mt-0.5 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="text-blue-700">
          Ubicación seleccionada: {{ formData.address }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import LeafletMap from "../components/LeafletMap.vue";

// Colores por categoría (deben coincidir con LeafletMap)
const categoryColors = {
  concierto: "bg-red-500",
  deporte: "bg-blue-500",
  cultural: "bg-yellow-500",
  gastronomia: "bg-green-500",
  otros: "bg-purple-500",
};

// Posición inicial (Madrid)
const initialPosition = ref({
  lat: 22.762395711851127,
  lng: -102.53574731095128,
});
// 22.762395711851127, -102.53574731095128
// Datos del formulario
const formData = ref({
  address: "",
  coordinates: {
    lat: "",
    lng: "",
  },
  details: "",
  city: "",
  postalCode: "",
});

const selectedEvent = ref(null);

// Manejar evento seleccionado
const handleEventSelected = (event) => {
  selectedEvent.value = event;

  // Actualizar formulario con ubicación del evento
  formData.value.address = event.location;
  formData.value.coordinates.lat = event.coordinates.lat.toFixed(6);
  formData.value.coordinates.lng = event.coordinates.lng.toFixed(6);
};

// Manejar la selección de ubicación
const handleLocationSelected = (location) => {
  updateFormLocation(location);
};

// Manejar la ubicación del usuario
const handleUserLocated = (location) => {
  updateFormLocation(location);
  alert("Se ha utilizado tu ubicación actual");
};

// Actualizar el formulario con la ubicación
const updateFormLocation = (location) => {
  formData.value.address = location.address;
  formData.value.coordinates.lat = location.coordinates.lat.toFixed(6);
  formData.value.coordinates.lng = location.coordinates.lng.toFixed(6);

  // Intentar extraer ciudad y código postal
  extractCityAndPostalCode(location.address);
};

// Usar ubicación actual
// eslint-disable-next-line
const useCurrentLocation = () => {
  // Emitir evento para que el mapa geolocalice al usuario
  // Esto activará la función locateUser en LeafletMap
  // que luego emitirá 'user-located' y actualizará el formulario
  // En una implementación real, podríamos tener una referencia al componente mapa
  // pero para simplificar, asumimos que el botón del mapa ya hace esta función
  alert('Haz clic en el botón "Mi ubicación" en el mapa');
};

// Limpiar ubicación seleccionada
// eslint-disable-next-line
const clearLocation = () => {
  formData.value.address = "";
  formData.value.coordinates.lat = "";
  formData.value.coordinates.lng = "";
};

// Extraer ciudad y código postal de la dirección
const extractCityAndPostalCode = (address) => {
  const matchPostalCode = address.match(/(\d{5})/);
  if (matchPostalCode) {
    formData.value.postalCode = matchPostalCode[0];
  }

  // Buscar nombres de ciudades comunes
  const cities = [
    "Madrid",
    "Barcelona",
    "Valencia",
    "Sevilla",
    "Zaragoza",
    "Málaga",
    "Murcia",
  ];
  for (const city of cities) {
    if (address.includes(city)) {
      formData.value.city = city;
      break;
    }
  }
};

// Enviar formulario
const submitForm = () => {
  console.log("Formulario enviado:", formData.value);
  alert("Dirección guardada con éxito!");
};
</script>
