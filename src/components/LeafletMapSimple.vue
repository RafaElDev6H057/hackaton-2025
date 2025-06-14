<template>
  <div class="map-container relative">
    <div
      ref="mapElement"
      class="w-full h-[500px] rounded-xl shadow-xl border border-gray-300"
    ></div>
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
