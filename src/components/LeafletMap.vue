<template>
  <div class="map-container relative">
    <div
      class="absolute top-4 left-16 z-[1000] bg-white rounded-lg shadow-md px-4 py-2 flex items-center space-x-2"
    >
      <label for="categoryFilter" class="font-semibold text-gray-700"
        >Categoría:</label
      >
      <select
        id="categoryFilter"
        v-model="selectedCategory"
        class="px-2 py-1 border border-gray-300 rounded"
      >
        <option value="">Todas</option>
        <option value="concierto">Concierto</option>
        <option value="deporte">Deporte</option>
        <option value="cultural">Cultural</option>
        <option value="gastronomia">Gastronomía</option>
        <option value="otros">Otros</option>
      </select>
    </div>

    <div
      ref="mapElement"
      class="w-full h-[500px] rounded-xl shadow-xl border border-gray-300"
    ></div>

    <!-- <div
      class="map-overlay absolute top-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md z-[1000]"
    >
      <span class="text-sm font-medium text-gray-700"
        >Haz clic en el mapa para seleccionar una ubicación</span
      >
    </div> -->

    <div class="absolute top-4 right-4 z-[1000] flex space-x-2">
      <button
        @click="locateUser"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
      >
        <svg
          class="w-5 h-5 mr-2"
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
        Mi ubicación
      </button>

      <button
        @click="toggleEventsPanel"
        class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        Eventos
      </button>
    </div>

    <!-- Panel de eventos -->
    <div
      v-if="showEventsPanel"
      class="absolute top-16 right-4 z-[1000] bg-white rounded-lg shadow-lg w-80 max-h-[70vh] overflow-hidden"
    >
      <div class="p-4 border-b border-gray-200">
        <h3 class="font-bold text-gray-800 flex items-center">
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Próximos Eventos
        </h3>
      </div>

      <div class="overflow-y-auto max-h-[60vh]">
        <div
          v-for="(event, index) in events"
          :key="index"
          class="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
          @click="flyToEvent(event)"
        >
          <div class="flex items-start">
            <div
              class="w-10 h-10 rounded-md flex items-center justify-center mr-3"
              :class="categoryColors[event.category]"
            >
              <div v-if="event.category === 'concierto'">
                <MusicIcon />
              </div>

              <div v-if="event.category === 'deporte'">
                <SportIcon />
              </div>

              <div v-if="event.category === 'cultural'">
                <CultureIcon />
              </div>

              <div v-if="event.category === 'gastronomia'">
                <FoodIcon />
              </div>
            </div>

            <div class="flex-1">
              <h4 class="font-bold text-gray-800">{{ event.title }}</h4>
              <div class="flex items-center text-sm text-gray-600 mt-1">
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
                {{ event.date }} • {{ event.time }}
              </div>
              <div class="flex items-center text-sm text-gray-600 mt-1">
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
                {{ event.location }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="p-3 bg-gray-50 border-t border-gray-200">
        <button
          @click="addSampleEvent"
          class="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center justify-center"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Añadir Evento de Prueba
        </button>
      </div> -->
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line
import { ref, onMounted, defineEmits, defineProps, watch } from "vue";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Solución para el problema de los iconos
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Icono para la ubicación del usuario
import userLocationIcon from "../assets/user-location.png";
import CultureIcon from "./icons/CultureIcon.vue";
import FoodIcon from "./icons/FoodIcon.vue";
import MusicIcon from "./icons/MusicIcon.vue";
import SportIcon from "./icons/SportIcon.vue";

// Configuración de iconos
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const props = defineProps({
  initialPosition: {
    type: Object,
    default: () => ({ lat: 22.7623, lng: -102.5357 }),
  },
});
// 22.762395711851127, -102.53574731095128

const emit = defineEmits([
  "location-selected",
  "user-located",
  "event-selected",
]);

const mapElement = ref(null);
const map = ref(null);
const marker = ref(null);
const userLocationMarker = ref(null);
const showEventsPanel = ref(false);
const eventMarkers = ref([]);

const selectedCategory = ref(""); // NUEVO: filtro de categoría

// Colores por categoría
const categoryColors = {
  concierto: "bg-red-500",
  deporte: "bg-blue-500",
  cultural: "bg-yellow-500",
  gastronomia: "bg-green-500",
  otros: "bg-purple-500",
};

function getFilteredEvents() {
  return selectedCategory.value
    ? events.value.filter((ev) => ev.category === selectedCategory.value)
    : events.value;
}

// Datos de prueba para eventos
const events = ref([]);

const fetchEvents = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/eventos");
    // Mapear los datos del backend al formato esperado por el mapa
    events.value = response.data.map((ev) => ({
      id: ev.id,
      title: ev.titulo,
      date: ev.fecha,
      time: ev.hora,
      location: ev.ubicacion,
      category: ev.categoria,
      coordinates: {
        lat: Number(ev.latitud),
        lng: Number(ev.longitud),
      },
      description: ev.descripcion,
    }));
    addEventsToMap();
  } catch (error) {
    console.error("Error al obtener eventos del backend:", error);
  }
};

onMounted(() => {
  if (!mapElement.value) return;

  // Crear instancia del mapa
  map.value = L.map(mapElement.value).setView(
    [props.initialPosition.lat, props.initialPosition.lng],
    13
  );

  // Añadir capa de tiles (OpenStreetMap)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value);

  // Obtener eventos reales del backend
  fetchEvents();

  // Intentar geolocalizar al usuario al cargar
  // locateUser();

  // Evento de clic en el mapa
  map.value.on("click", async (e) => {
    const { lat, lng } = e.latlng;

    // Eliminar marcador anterior si existe
    if (marker.value) {
      map.value.removeLayer(marker.value);
    }

    // Añadir nuevo marcador
    marker.value = L.marker([lat, lng]).addTo(map.value);

    try {
      // Mostrar un popup de carga
      marker.value.bindPopup("Buscando dirección...").openPopup();

      // Realizar geocodificación inversa para obtener la dirección
      const address = await reverseGeocode(lat, lng);

      // Actualizar el popup con la dirección
      marker.value.setPopupContent(
        `<b>Ubicación seleccionada:</b><br>${address}`
      );

      // Emitir evento con los datos de la ubicación
      emit("location-selected", {
        coordinates: { lat, lng },
        address,
      });
    } catch (error) {
      console.error("Error al obtener la dirección:", error);
      marker.value.setPopupContent("Error al obtener la dirección");
    }
  });
});

const categorySVGs = {
  concierto: `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g fill="none">
      <path
        d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
      />
      <path
        fill="#fff"
        d="M21 5.18V17a4 4 0 1 1-2-3.465V9.181L9 10.847V18q0 .09-.015.174A3.5 3.5 0 1 1 7 15.337v-8.49a2 2 0 0 1 1.671-1.973l10-1.666A2 2 0 0 1 21 5.18M5.5 17a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3M17 15a2 2 0 1 0 0 4a2 2 0 0 0 0-4m2-9.82L9 6.847V8.82l10-1.667z"
      />
    </g>
  </svg>`,
  deporte: `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 48 48"
  >
    <g fill="none" stroke="#fff" stroke-width="4">
      <path d="M36 15a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z" />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m12 16.77l8.003-2.772L31 19.247l-10.997 8.197L31 34.684l-6.992 9.314M35.32 21.643l2.682 1.459L44 17.466M16.849 31.545l-2.97 3.912l-9.875 5.54"
      />
    </g>
  </svg>`,
  cultural: `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 48 48"
  >
    <path
      fill="#fff"
      fill-rule="evenodd"
      d="M16.445 6.168a1 1 0 0 1 1.11 0l6 4A1 1 0 0 1 24 11v8a1 1 0 0 1-1 1H11a1 1 0 0 1-1-1v-8a1 1 0 0 1 .445-.832zM16 18h2v-4h-2zm4 0v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5h-2v-6.465l5-3.333l5 3.333V18zm14.496-5.868a1 1 0 0 0-.992 0l-7 4A1 1 0 0 0 26 17v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V17a1 1 0 0 0-.504-.868zM37 26h3v-8.42l-6-3.428l-6 3.428V26h3v-6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1zm-2 0v-5h-2v5zm-11.553 2.106l-8-4a1 1 0 0 0-.894 0l-8 4A1 1 0 0 0 6 29v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V29a1 1 0 0 0-.553-.894M16 34v6h-2v-6zm2-1v7h4V29.618l-7-3.5l-7 3.5V40h4v-7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1"
      clip-rule="evenodd"
    />
  </svg>`,
  gastronomia: `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 16 16"
  >
    <path
      fill="#fff"
      d="M1.338 1.961C1.495 1.362 2.041 1 2.615 1c.354 0 .676.133.921.35a1.5 1.5 0 0 1 1.928 0A1.38 1.38 0 0 1 6.385 1c.574 0 1.12.362 1.277.961C7.812 2.533 8 3.455 8 4.5a3.5 3.5 0 0 1-1.595 2.936c-.271.177-.405.405-.405.6v.396q0 .034.004.066c.034.248.157 1.169.272 2.124c.113.937.224 1.959.224 2.378a2 2 0 1 1-4 0c0-.42.111-1.44.224-2.378c.115-.955.238-1.876.272-2.124L3 8.432v-.396c0-.195-.134-.423-.405-.6A3.5 3.5 0 0 1 1 4.5c0-1.045.188-1.967.338-2.539M6 5a.5.5 0 0 1-1 0V2.5a.5.5 0 0 0-1 0V5a.5.5 0 0 1-1 0V2.385A.385.385 0 0 0 2.615 2c-.166 0-.28.099-.31.215A9.2 9.2 0 0 0 2 4.5a2.5 2.5 0 0 0 1.14 2.098c.439.285.86.786.86 1.438v.396q0 .1-.013.2c-.034.246-.156 1.161-.27 2.11c-.116.965-.217 1.914-.217 2.258a1 1 0 1 0 2 0c0-.344-.1-1.293-.217-2.259c-.114-.948-.236-1.863-.27-2.11A2 2 0 0 1 5 8.433v-.396c0-.652.421-1.153.86-1.438A2.5 2.5 0 0 0 7 4.5c0-.932-.168-1.764-.305-2.285C6.665 2.1 6.55 2 6.385 2A.385.385 0 0 0 6 2.385zm3 .5A4.5 4.5 0 0 1 13.5 1a.5.5 0 0 1 .5.5v5.973l.019.177a261 261 0 0 1 .229 2.24c.123 1.256.252 2.664.252 3.11a2 2 0 1 1-4 0c0-.446.129-1.854.252-3.11c.063-.637.126-1.247.173-1.699l.02-.191H10a1 1 0 0 1-1-1zm2.997 2.053l-.021.202a386 386 0 0 0-.228 2.233c-.127 1.287-.248 2.63-.248 3.012a1 1 0 1 0 2 0c0-.383-.121-1.725-.248-3.012a315 315 0 0 0-.228-2.233l-.021-.201L13 7.5V2.035A3.5 3.5 0 0 0 10 5.5V7h1.5a.5.5 0 0 1 .497.553"
    />
  </svg>`,
  otros: `<svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
  </svg>`,
};

// Función para añadir eventos al mapa
const addEventsToMap = () => {
  if (!map.value) return;

  // Limpiar marcadores existentes
  eventMarkers.value.forEach((marker) => {
    map.value.removeLayer(marker);
  });
  eventMarkers.value = [];

  // Usar eventos filtrados
  getFilteredEvents().forEach((event) => {
    const eventIcon = L.divIcon({
      className: "event-marker",
      html: `
        <div class="relative">
          <div class="w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
            categoryColors[event.category] || "bg-purple-500"
          }">
            <div class="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 ${
            categoryColors[event.category] || "bg-purple-500"
          } rotate-45"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    const svgIcon = categorySVGs[event.category] || categorySVGs["otros"];

    const eventMarker = L.marker(
      [event.coordinates.lat, event.coordinates.lng],
      {
        icon: eventIcon,
      }
    ).addTo(map.value);

    eventMarker.bindPopup(`
      <div class="event-popup min-w-[250px]">
        <div class="flex items-start">
          <div class="w-10 h-10 rounded-md flex items-center justify-center mr-3 ${
            categoryColors[event.category] || "bg-purple-500"
          }">
            ${svgIcon}
          </div>
          <div>
            <h4 class="font-bold text-gray-800">${event.title}</h4>
            <p class="text-sm text-gray-600 mt-1">${event.date} • ${
      event.time
    }</p>
          </div>
        </div>
        <div class="mt-3 flex items-center text-sm text-gray-600">
          <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          ${event.location}
        </div>
        <div class="mt-2 text-sm text-gray-700">${event.description}</div>
        <div class="mt-3">
          <button class="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Más información
          </button>
        </div>
      </div>
    `);

    eventMarkers.value.push(eventMarker);

    eventMarker.on("click", () => {
      emit("event-selected", event);
    });
  });
};

// Watch para refrescar marcadores cuando cambia el filtro o los eventos
watch([selectedCategory, events], () => {
  addEventsToMap();
});
// Función para volar a un evento
const flyToEvent = (event) => {
  map.value.flyTo([event.coordinates.lat, event.coordinates.lng], 16, {
    duration: 1,
  });

  // Abrir popup del evento
  const marker = eventMarkers.value.find(
    (m) =>
      m.getLatLng().lat === event.coordinates.lat &&
      m.getLatLng().lng === event.coordinates.lng
  );

  if (marker) {
    marker.openPopup();
  }
  showEventsPanel.value = false;
};

// Añadir evento de prueba
// const addSampleEvent = () => {
//   const newEvent = {
//     id: events.value.length + 1,
//     title: `Evento de Prueba ${events.value.length + 1}`,
//     date: "30 Oct 2023",
//     time: "18:00",
//     location: "Nueva ubicación",
//     category: "otros",
//     coordinates: {
//       lat: props.initialPosition.lat + (Math.random() - 0.5) * 0.1,
//       lng: props.initialPosition.lng + (Math.random() - 0.5) * 0.1,
//     },
//     description: "Este es un evento de prueba añadido desde el panel",
//   };

//   events.value.push(newEvent);
//   addEventsToMap();
//   flyToEvent(newEvent);
// };

// Mostrar/ocultar panel de eventos
const toggleEventsPanel = () => {
  showEventsPanel.value = !showEventsPanel.value;
};

// Función para geolocalizar al usuario
const locateUser = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Eliminar marcador de ubicación anterior si existe
        if (userLocationMarker.value) {
          map.value.removeLayer(userLocationMarker.value);
        }

        // Crear icono personalizado para la ubicación del usuario
        const userIcon = L.icon({
          iconUrl: userLocationIcon,
          iconSize: [38, 38],
          iconAnchor: [19, 38],
        });

        // Añadir nuevo marcador con icono personalizado
        userLocationMarker.value = L.marker([lat, lng], { icon: userIcon })
          .addTo(map.value)
          .bindPopup("Tu ubicación actual")
          .openPopup();

        // Centrar el mapa en la ubicación del usuario
        map.value.setView([lat, lng], 15);
        map.marker([lat, lng]);

        // Obtener dirección de la ubicación
        try {
          const address = await reverseGeocode(lat, lng);

          // Emitir evento de ubicación del usuario
          emit("user-located", {
            coordinates: { lat, lng },
            address,
          });
        } catch (error) {
          console.error("Error al obtener la dirección:", error);
        }
      },
      (error) => {
        console.error("Error al obtener la ubicación:", error);
        alert(
          "No se pudo obtener tu ubicación. Asegúrate de haber dado los permisos necesarios."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  } else {
    alert("Tu navegador no soporta geolocalización.");
  }
};

// Función para geocodificación inversa (coordenadas → dirección)
async function reverseGeocode(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    );

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const data = await response.json();

    if (!data.address) {
      return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    }

    // Construir una dirección legible
    const address = data.address;
    const parts = [];

    if (address.road) parts.push(address.road);
    if (address.house_number) parts.push(address.house_number);
    if (parts.length > 0) parts.push(", ");
    if (address.city_district) parts.push(address.city_district);
    if (address.town || address.city || address.village) {
      parts.push(address.town || address.city || address.village);
    }
    if (address.state) parts.push(", ", address.state);
    if (address.postcode) parts.push(", ", address.postcode);

    return parts.join("");
  } catch (error) {
    console.error("Error en reverseGeocode:", error);
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  }
}
</script>

<style scoped>
.map-container {
  font-family: "Inter", sans-serif;
}
</style>
