<script setup lang="ts">
import { ref } from 'vue'
import { useEvents } from '../composables/useEvents'

const { events } = useEvents()
const showModal = ref(false)
const scanResult = ref(false)
const selectedEvent = ref<any>(null)
const reservationData = ref({
  name: '',
  email: '',
  phone: '',
  attendees: 1
})

const openScanModal = () => {
  showModal.value = true
  scanResult.value = false
  selectedEvent.value = null
}

const closeScanModal = () => {
  showModal.value = false
  scanResult.value = false
  selectedEvent.value = null
  reservationData.value = {
    name: '',
    email: '',
    phone: '',
    attendees: 1
  }
}

const simulateScan = () => {
  // Simular escaneo de QR de un evento
  const randomEvent = events.value[Math.floor(Math.random() * events.value.length)]
  selectedEvent.value = randomEvent
  scanResult.value = true
}

const makeReservation = () => {
  if (!reservationData.value.name || !reservationData.value.email || !reservationData.value.phone) {
    alert('Por favor completa todos los campos')
    return
  }
  
  alert(`¡Reservación confirmada para ${selectedEvent.value.title}!\nNombre: ${reservationData.value.name}\nAsistentes: ${reservationData.value.attendees}`)
  closeScanModal()
}

const features = ref([
  {
    id: 1,
    title: 'Eventos Culturales',
    description: 'Escanea códigos QR para reservar tu lugar en festivales, conciertos y exposiciones.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 2,
    title: 'Tours y Experiencias',
    description: 'Reserva tours guiados y experiencias únicas escaneando el código QR del lugar.',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 3,
    title: 'Actividades Gastronómicas',
    description: 'Reserva tu mesa en eventos gastronómicos y cenas especiales.',
    image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }
])
</script>

<template>
  <section class="section" role="region" aria-labelledby="escaneoTitle">
    <div class="container">
      <div class="section-header">
        <img src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80" alt="Escaneo de códigos QR para reservaciones" />
        <h2 id="escaneoTitle">Reservaciones con Código QR</h2>
        <p>Escanea códigos QR para hacer reservaciones instantáneas en eventos, tours y experiencias. ¡Rápido y fácil!</p>
      </div>
      
      <div class="features-grid">
        <div 
          v-for="feature in features" 
          :key="feature.id"
          class="card"
        >
          <img :src="feature.image" :alt="feature.title" class="card-img" />
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
      
      <div class="scan-button-container">
        <button class="btn-primary" @click="openScanModal">
          Escanear QR para Reservar
        </button>
      </div>
    </div>
    
    <!-- Modal de escaneo y reservación -->
    <div v-if="showModal" class="scan-modal" @click="closeScanModal">
      <div class="scan-modal-content" @click.stop>
        <h3>Escaneo de Código QR</h3>
        
        <div v-if="!scanResult" class="scanner-view">
          <div class="qr-placeholder">
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://nearnow.example.com/event/festival-musica" 
              alt="Código QR de ejemplo" 
            />
          </div>
          <p>Apunta tu cámara al código QR del evento para hacer tu reservación</p>
          <button class="btn-primary" @click="simulateScan">
            Simular Escaneo de Evento
          </button>
        </div>
        
        <div v-else class="reservation-form">
          <h4>{{ selectedEvent.title }}</h4>
          <div class="event-details">
            <p><strong>Fecha:</strong> {{ selectedEvent.date }}</p>
            <p><strong>Hora:</strong> {{ selectedEvent.time }}</p>
            <p><strong>Ubicación:</strong> {{ selectedEvent.location }}</p>
            <p><strong>Categoría:</strong> {{ selectedEvent.category }}</p>
          </div>
          
          <form @submit.prevent="makeReservation" class="reservation-inputs">
            <div class="form-group">
              <label for="reservationName">Nombre completo</label>
              <input 
                type="text" 
                id="reservationName" 
                v-model="reservationData.name"
                placeholder="Tu nombre completo" 
                required 
              />
            </div>
            
            <div class="form-group">
              <label for="reservationEmail">Email</label>
              <input 
                type="email" 
                id="reservationEmail" 
                v-model="reservationData.email"
                placeholder="tu@email.com" 
                required 
              />
            </div>
            
            <div class="form-group">
              <label for="reservationPhone">Teléfono</label>
              <input 
                type="tel" 
                id="reservationPhone" 
                v-model="reservationData.phone"
                placeholder="123-456-7890" 
                required 
              />
            </div>
            
            <div class="form-group">
              <label for="attendees">Número de asistentes</label>
              <select id="attendees" v-model="reservationData.attendees">
                <option value="1">1 persona</option>
                <option value="2">2 personas</option>
                <option value="3">3 personas</option>
                <option value="4">4 personas</option>
                <option value="5">5+ personas</option>
              </select>
            </div>
            
            <button type="submit" class="btn-primary">
              Confirmar Reservación
            </button>
          </form>
        </div>
        
        <button class="btn-secondary" @click="closeScanModal">
          Cerrar
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header img {
  max-height: 200px;
  object-fit: cover;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  width: 100%;
  max-width: 600px;
}

.section-header h2 {
  font-size: 1.75rem;
  color: #111827;
  margin-bottom: 0.5rem;
}

.section-header p {
  font-size: 1rem;
  color: #6b7280;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.card {
  background: #f9fafb;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.05);
  transition: transform 0.3s ease;
  text-align: center;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgb(37 99 235 / 0.3);
}

.card-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
}

.card h3 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #1e40af;
}

.card p {
  margin: 0;
  color: #6b7280;
}

.scan-button-container {
  text-align: center;
}

.btn-primary {
  background-color: #2563eb;
  border: none;
  color: white;
  font-weight: 700;
  font-size: 1.125rem;
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(37, 99, 235, 0.5);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #1e40af;
  transform: scale(1.05);
}

.btn-secondary {
  background-color: #6b7280;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.btn-secondary:hover {
  background-color: #4b5563;
}

.scan-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.scan-modal-content {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  text-align: center;
  box-shadow: 0 10px 30px rgb(0 0 0 / 0.15);
}

.scan-modal-content h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-weight: 700;
  color: #2563eb;
}

.scanner-view {
  margin-bottom: 2rem;
}

.qr-placeholder {
  margin: 1rem auto;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  display: inline-block;
}

.qr-placeholder img {
  width: 200px;
  height: 200px;
  border-radius: 0.5rem;
}

.reservation-form {
  text-align: left;
  margin-bottom: 2rem;
}

.reservation-form h4 {
  color: #2563eb;
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
}

.event-details {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
}

.event-details p {
  margin: 0.25rem 0;
  color: #374151;
  font-size: 0.9rem;
}

.reservation-inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

@media (max-width: 768px) {
  .section-header h2 {
    font-size: 1.5rem;
  }
  
  .scan-modal-content {
    margin: 1rem;
    padding: 1.5rem;
  }
}
</style>