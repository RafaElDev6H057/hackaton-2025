<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { useEvents } from "../composables/useEvents";
import LeafletMapSimple from "./LeafletMapSimple.vue";

const { events, addEvent, eventFilter, filteredEvents, renderCalendar } =
  useEvents();

const eventForm = ref({
  title: "",
  date: "",
  time: "",
  location: "",
  category: "",
  description: "",
  coordinates: {
    lat: "",
    lng: "",
  },
});

const formMessage = ref("");
const isSubmitting = ref(false);

const handleLocationSelected = (location) => {
  eventForm.value.location = location.address;
  eventForm.value.coordinates.lat = location.coordinates.lat;
  eventForm.value.coordinates.lng = location.coordinates.lng;
};

const submitEvent = async () => {
  formMessage.value = "";

  if (
    !eventForm.value.title ||
    !eventForm.value.date ||
    !eventForm.value.time ||
    !eventForm.value.location ||
    !eventForm.value.category
  ) {
    formMessage.value = "Por favor, completa todos los campos obligatorios.";
    return;
  }

  // Construir el objeto para el backend
  const payload = {
    titulo: eventForm.value.title,
    fecha: eventForm.value.date,
    hora: eventForm.value.time,
    ubicacion: eventForm.value.location,
    categoria: eventForm.value.category,
    descripcion: eventForm.value.description,
    latitud: Number(eventForm.value.coordinates.lat),
    longitud: Number(eventForm.value.coordinates.lng),
  };

  isSubmitting.value = true;
  try {
    // Cambia la URL por la de tu backend real
    await axios.post("http://127.0.0.1:8000/eventos", payload);
    formMessage.value = "Evento publicado con éxito. Gracias por contribuir.";

    // Opcional: agrega el evento localmente
    addEvent(eventForm.value);

    // Reset form
    eventForm.value = {
      title: "",
      date: "",
      time: "",
      location: "",
      category: "",
      description: "",
      coordinates: {
        lat: "",
        lng: "",
      },
    };
  } catch (error) {
    formMessage.value =
      "Hubo un error al publicar el evento. Intenta de nuevo.";
  } finally {
    isSubmitting.value = false;
  }
};

const calendarData = computed(() => renderCalendar());
</script>

<template>
  <section
    class="py-16 bg-gray-50"
    role="region"
    aria-labelledby="eventosTitle"
  >
    <div class="max-w-[1200px] mx-auto px-4">
      <!-- Encabezado de sección -->
      <div class="text-center mb-12">
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Eventos culturales"
          class="max-h-[200px] object-cover mb-6 shadow-lg rounded-xl w-full max-w-[600px] mx-auto"
        />
        <h2 id="eventosTitle" class="text-3xl font-bold text-gray-900 mb-2">
          Explorar Eventos Cercanos
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Filtra los eventos que suceden hoy o mañana cerca de ti y descubre
          nuevas experiencias.
        </p>
      </div>

      <!-- Filtro de eventos -->
      <div class="flex items-center mb-6">
        <label for="eventFilter" class="font-semibold mr-2 text-gray-700">
          Filtrar por fecha:
        </label>
        <select
          id="eventFilter"
          v-model="eventFilter"
          class="px-4 py-2 border border-gray-300 rounded-xl text-base max-w-[240px]"
        >
          <option value="hoy">Hoy</option>
          <option value="mañana">Mañana</option>
          <option value="todos">Todos</option>
        </select>
      </div>

      <!-- Lista de eventos -->
      <ul class="list-none p-0 m-0 mb-8">
        <li
          v-if="filteredEvents.length === 0"
          class="text-gray-400 italic text-center py-8"
        >
          No hay eventos para esta fecha.
        </li>
        <li
          v-for="event in filteredEvents"
          :key="event.id"
          class="bg-gray-50 mb-2.5 p-3 rounded-xl shadow-sm cursor-pointer transition-colors duration-200 hover:bg-blue-50"
          :title="event.description"
        >
          {{ event.title }} - {{ event.location }} ({{ event.category }}) -
          {{ event.date }} {{ event.time }}
        </li>
      </ul>

      <!-- Formulario y mapa en dos columnas -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        <!-- Columna izquierda: Formulario -->
        <div>
          <h3 class="text-2xl font-semibold text-gray-800 mb-1">
            Publica tu Evento
          </h3>
          <p class="text-gray-600 mb-4">
            ¿Eres anfitrión? Llena el formulario para publicar tu evento.
          </p>

          <form
            @submit.prevent="submitEvent"
            class="bg-gray-50 p-8 rounded-xl shadow-md max-w-[600px]"
          >
            <div class="mb-4">
              <label
                for="eventTitle"
                class="block font-semibold text-gray-700 mb-1"
              >
                Título
              </label>
              <input
                type="text"
                id="eventTitle"
                v-model="eventForm.title"
                placeholder="Nombre del evento"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg text-base"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  for="eventDate"
                  class="block font-semibold text-gray-700 mb-1"
                >
                  Fecha
                </label>
                <input
                  type="date"
                  id="eventDate"
                  v-model="eventForm.date"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg text-base"
                />
              </div>
              <div>
                <label
                  for="eventTime"
                  class="block font-semibold text-gray-700 mb-1"
                >
                  Hora
                </label>
                <input
                  type="time"
                  id="eventTime"
                  v-model="eventForm.time"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg text-base"
                />
              </div>
            </div>

            <div class="mb-4">
              <label
                for="eventLocation"
                class="block font-semibold text-gray-700 mb-1"
              >
                Ubicación
              </label>
              <input
                type="text"
                id="eventLocation"
                v-model="eventForm.location"
                placeholder="Selecciona una ubicación en el mapa"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg text-base bg-gray-100"
                disabled
              />
              <div
                v-if="eventForm.coordinates.lat && eventForm.coordinates.lng"
                class="text-xs text-gray-500 mt-1"
              >
                Lat: {{ eventForm.coordinates.lat }}, Lng:
                {{ eventForm.coordinates.lng }}
              </div>
            </div>

            <div class="mb-4">
              <label
                for="eventCategory"
                class="block font-semibold text-gray-700 mb-1"
              >
                Categoría
              </label>
              <select
                id="eventCategory"
                v-model="eventForm.category"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg text-base"
              >
                <option value="" disabled>Selecciona categoría</option>
                <option value="concierto">Concierto</option>
                <option value="deporte">Deporte</option>
                <option value="cultural">Cultural</option>
                <option value="gastronomia">Gastronomia</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div class="mb-4">
              <label
                for="eventDescription"
                class="block font-semibold text-gray-700 mb-1"
              >
                Descripción (opcional)
              </label>
              <textarea
                id="eventDescription"
                v-model="eventForm.description"
                placeholder="Descripción breve del evento"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg text-base min-h-[80px]"
              ></textarea>
            </div>

            <button
              type="submit"
              class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-xl shadow-[0_6px_15px_rgba(37,99,235,0.5)] transition-all duration-300 hover:scale-105 mt-6"
            >
              Publicar Evento
            </button>

            <p v-if="formMessage" class="text-blue-600 font-bold mt-4">
              {{ formMessage }}
            </p>
          </form>
        </div>

        <!-- Columna derecha: Mapa -->
        <div class="flex flex-col items-center justify-start">
          <label class="block font-semibold text-gray-700 mb-2">
            Selecciona la ubicación en el mapa
          </label>
          <LeafletMapSimple
            style="height: 400px; width: 100%; border-radius: 12px"
            :initial-position="{
              lat: 22.762395711851127,
              lng: -102.53574731095128,
            }"
            @location-selected="handleLocationSelected"
          />
        </div>
      </div>

      <!-- Calendario de eventos -->
      <div class="mt-12">
        <h3 class="text-2xl font-semibold text-blue-600 mb-4">
          Calendario de Eventos
        </h3>
        <div
          class="max-w-[1200px] rounded-xl shadow-md p-4 bg-gray-50 mx-auto"
          v-html="calendarData"
        ></div>
      </div>
    </div>
  </section>
</template>
