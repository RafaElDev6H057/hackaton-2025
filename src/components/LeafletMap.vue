<template>
  <div class="map-container relative">
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
              <svg
                class="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  v-if="event.category === 'concierto'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
                <path
                  v-if="event.category === 'deporte'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
                <path
                  v-if="event.category === 'cultural'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
                <path
                  v-if="event.category === 'gastronomia'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
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

      <div class="p-3 bg-gray-50 border-t border-gray-200">
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
      </div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line
import { ref, onMounted, defineEmits, defineProps, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Solución para el problema de los iconos
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Icono para la ubicación del usuario
import userLocationIcon from "../assets/user-location.png";

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
    default: () => ({ lat: 40.416775, lng: -3.70379 }),
  },
});

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

// Colores por categoría
const categoryColors = {
  concierto: "bg-red-500",
  deporte: "bg-blue-500",
  cultural: "bg-yellow-500",
  gastronomia: "bg-green-500",
  otros: "bg-purple-500",
};

// Datos de prueba para eventos
const events = ref([
  {
    id: 1,
    title: "Concierto de Jazz en el Parque",
    date: "15 Oct 2023",
    time: "19:00",
    location: "Parque del Retiro, Madrid",
    category: "concierto",
    coordinates: { lat: 40.4145, lng: -3.6837 },
    description:
      "Disfruta de una noche de jazz con la famosa banda 'Madrid Jazz Quartet' en el icónico parque madrileño.",
  },
  {
    id: 2,
    title: "Partido de Fútbol: Real Madrid vs Barcelona",
    date: "22 Oct 2023",
    time: "21:00",
    location: "Estadio Santiago Bernabéu",
    category: "deporte",
    coordinates: { lat: 40.4531, lng: -3.6883 },
    description:
      "El clásico español en el estadio Bernabéu. ¡No te pierdas este emocionante partido!",
  },
  {
    id: 3,
    title: "Exposición de Arte Moderno",
    date: "18 Oct 2023",
    time: "10:00 - 20:00",
    location: "Museo Reina Sofía",
    category: "cultural",
    coordinates: { lat: 40.4078, lng: -3.6943 },
    description:
      "Explora las obras más destacadas del arte moderno español e internacional.",
  },
  {
    id: 4,
    title: "Feria Gastronómica Internacional",
    date: "25-28 Oct 2023",
    time: "12:00 - 22:00",
    location: "Matadero Madrid",
    category: "gastronomia",
    coordinates: { lat: 40.392, lng: -3.6985 },
    description:
      "Degustación de platos de más de 30 países en el corazón de Madrid.",
  },
]);

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

  // Añadir eventos al mapa
  addEventsToMap();

  // Intentar geolocalizar al usuario al cargar
  locateUser();

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

// Función para añadir eventos al mapa
const addEventsToMap = () => {
  // Limpiar marcadores existentes
  eventMarkers.value.forEach((marker) => {
    map.value.removeLayer(marker);
  });
  eventMarkers.value = [];

  // Añadir cada evento como marcador
  events.value.forEach((event) => {
    // Crear icono personalizado según categoría
    const eventIcon = L.divIcon({
      className: "event-marker",
      html: `
        <div class="relative">
          <div class="w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
            categoryColors[event.category]
          }">
            <div class="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 ${
            categoryColors[event.category]
          } rotate-45"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    // Crear marcador
    const eventMarker = L.marker(
      [event.coordinates.lat, event.coordinates.lng],
      {
        icon: eventIcon,
      }
    ).addTo(map.value);

    // Añadir popup con información del evento
    eventMarker.bindPopup(`
      <div class="event-popup min-w-[250px]">
        <div class="flex items-start">
          <div class="w-10 h-10 rounded-md flex items-center justify-center mr-3 ${
            categoryColors[event.category]
          }">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
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

    // Guardar referencia al marcador
    eventMarkers.value.push(eventMarker);

    // Evento al hacer clic en el marcador
    eventMarker.on("click", () => {
      emit("event-selected", event);
    });
  });
};

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
};

// Añadir evento de prueba
const addSampleEvent = () => {
  const newEvent = {
    id: events.value.length + 1,
    title: `Evento de Prueba ${events.value.length + 1}`,
    date: "30 Oct 2023",
    time: "18:00",
    location: "Nueva ubicación",
    category: "otros",
    coordinates: {
      lat: props.initialPosition.lat + (Math.random() - 0.5) * 0.1,
      lng: props.initialPosition.lng + (Math.random() - 0.5) * 0.1,
    },
    description: "Este es un evento de prueba añadido desde el panel",
  };

  events.value.push(newEvent);
  addEventsToMap();
  flyToEvent(newEvent);
};

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
