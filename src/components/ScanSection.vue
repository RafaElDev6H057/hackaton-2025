<script setup>
import { ref } from "vue";
import { useEvents } from "../composables/useEvents";

const { events } = useEvents();
const showModal = ref(false);
const scanResult = ref(false);
const selectedEvent = ref(null);
const reservationData = ref({
  name: "",
  email: "",
  phone: "",
  attendees: 1,
});

const openScanModal = () => {
  showModal.value = true;
  scanResult.value = false;
  selectedEvent.value = null;
};

const closeScanModal = () => {
  showModal.value = false;
  scanResult.value = false;
  selectedEvent.value = null;
  reservationData.value = {
    name: "",
    email: "",
    phone: "",
    attendees: 1,
  };
};

const simulateScan = () => {
  // Simular escaneo de QR de un evento
  const randomEvent =
    events.value[Math.floor(Math.random() * events.value.length)];
  selectedEvent.value = randomEvent;
  scanResult.value = true;
};

const makeReservation = () => {
  if (
    !reservationData.value.name ||
    !reservationData.value.email ||
    !reservationData.value.phone
  ) {
    alert("Por favor completa todos los campos");
    return;
  }

  alert(
    `¡Reservación confirmada para ${selectedEvent.value.title}!\nNombre: ${reservationData.value.name}\nAsistentes: ${reservationData.value.attendees}`
  );
  closeScanModal();
};

const features = ref([
  {
    id: 1,
    title: "Eventos Culturales",
    description:
      "Escanea códigos QR para reservar tu lugar en festivales, conciertos y exposiciones.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 2,
    title: "Tours y Experiencias",
    description:
      "Reserva tours guiados y experiencias únicas escaneando el código QR del lugar.",
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 3,
    title: "Actividades Gastronómicas",
    description: "Reserva tu mesa en eventos gastronómicos y cenas especiales.",
    image:
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
]);
</script>

<template>
  <section
    class="py-16 bg-gray-50"
    role="region"
    aria-labelledby="escaneoTitle"
  >
    <div class="max-w-[1200px] mx-auto px-4">
      <!-- Encabezado de sección -->
      <div class="text-center mb-12">
        <img
          src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80"
          alt="Escaneo de códigos QR para reservaciones"
          class="max-h-[200px] object-cover mb-6 shadow-lg rounded-xl w-full max-w-[600px] mx-auto"
        />
        <h2 id="escaneoTitle" class="text-3xl font-bold text-gray-900 mb-2">
          Reservaciones con Código QR
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Escanea códigos QR para hacer reservaciones instantáneas en eventos,
          tours y experiencias. ¡Rápido y fácil!
        </p>
      </div>

      <!-- Grid de características -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div
          v-for="feature in features"
          :key="feature.id"
          class="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(37,99,235,0.3)]"
        >
          <img
            :src="feature.image"
            :alt="feature.title"
            class="w-full h-48 object-cover mb-4 rounded-lg"
          />
          <h3 class="text-xl font-bold text-blue-800 mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600">
            {{ feature.description }}
          </p>
        </div>
      </div>

      <!-- Botón de escaneo -->
      <div class="text-center">
        <button
          class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-xl shadow-[0_6px_15px_rgba(37,99,235,0.5)] transition-all duration-300 hover:scale-105"
          @click="openScanModal"
        >
          Escanear QR para Reservar
        </button>
      </div>
    </div>

    <!-- Modal de escaneo y reservación -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      @click="closeScanModal"
    >
      <div
        class="bg-white rounded-xl shadow-lg max-w-[500px] w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="p-6">
          <h3 class="text-xl font-bold text-blue-600 mb-4">
            Escaneo de Código QR
          </h3>

          <div v-if="!scanResult" class="mb-6">
            <div class="bg-gray-50 p-4 rounded-lg inline-block my-2">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://nearnow.example.com/event/festival-musica"
                alt="Código QR de ejemplo"
                class="w-48 h-48 rounded-lg mx-auto"
              />
            </div>
            <p class="text-gray-600 mb-4">
              Apunta tu cámara al código QR del evento para hacer tu reservación
            </p>
            <button
              class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-xl shadow-[0_6px_15px_rgba(37,99,235,0.5)] transition-all duration-300 hover:scale-105"
              @click="simulateScan"
            >
              Simular Escaneo de Evento
            </button>
          </div>

          <div v-else class="text-left">
            <h4 class="text-lg font-bold text-blue-600 mb-4 text-center">
              {{ selectedEvent.title }}
            </h4>
            <div class="bg-gray-50 p-4 rounded-lg mb-6">
              <p class="text-gray-800 mb-1">
                <span class="font-semibold">Fecha:</span>
                {{ selectedEvent.date }}
              </p>
              <p class="text-gray-800 mb-1">
                <span class="font-semibold">Hora:</span>
                {{ selectedEvent.time }}
              </p>
              <p class="text-gray-800 mb-1">
                <span class="font-semibold">Ubicación:</span>
                {{ selectedEvent.location }}
              </p>
              <p class="text-gray-800">
                <span class="font-semibold">Categoría:</span>
                {{ selectedEvent.category }}
              </p>
            </div>

            <form @submit.prevent="makeReservation" class="space-y-4">
              <div>
                <label
                  for="reservationName"
                  class="block font-semibold text-gray-700 mb-1"
                >
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="reservationName"
                  v-model="reservationData.name"
                  placeholder="Tu nombre completo"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  for="reservationEmail"
                  class="block font-semibold text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="reservationEmail"
                  v-model="reservationData.email"
                  placeholder="tu@email.com"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  for="reservationPhone"
                  class="block font-semibold text-gray-700 mb-1"
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="reservationPhone"
                  v-model="reservationData.phone"
                  placeholder="123-456-7890"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  for="attendees"
                  class="block font-semibold text-gray-700 mb-1"
                >
                  Número de asistentes
                </label>
                <select
                  id="attendees"
                  v-model="reservationData.attendees"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="1">1 persona</option>
                  <option value="2">2 personas</option>
                  <option value="3">3 personas</option>
                  <option value="4">4 personas</option>
                  <option value="5">5+ personas</option>
                </select>
              </div>

              <button
                type="submit"
                class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-xl shadow-[0_6px_15px_rgba(37,99,235,0.5)] transition-all duration-300 hover:scale-105 w-full mt-4"
              >
                Confirmar Reservación
              </button>
            </form>
          </div>

          <button
            class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 mt-6 w-full"
            @click="closeScanModal"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
