<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useEvents } from '../composables/useEvents'

const { events, addEvent, eventFilter, filteredEvents, renderCalendar } = useEvents()

const eventForm = ref({
  title: '',
  date: '',
  time: '',
  location: '',
  category: '',
  description: ''
})

const formMessage = ref('')

const submitEvent = () => {
  formMessage.value = ''
  
  if (!eventForm.value.title || !eventForm.value.date || !eventForm.value.time || 
      !eventForm.value.location || !eventForm.value.category) {
    formMessage.value = 'Por favor, completa todos los campos obligatorios.'
    return
  }
  
  addEvent(eventForm.value)
  
  // Reset form
  eventForm.value = {
    title: '',
    date: '',
    time: '',
    location: '',
    category: '',
    description: ''
  }
  
  formMessage.value = 'Evento publicado con éxito. Gracias por contribuir.'
}

const calendarData = computed(() => renderCalendar())
</script>

<template>
  <section class="section" role="region" aria-labelledby="eventosTitle">
    <div class="container">
      <div class="section-header">
        <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Eventos culturales" />
        <h2 id="eventosTitle">Explorar Eventos Cercanos</h2>
        <p>Filtra los eventos que suceden hoy o mañana cerca de ti y descubre nuevas experiencias.</p>
      </div>
      
      <div class="events-filter">
        <label for="eventFilter">Filtrar por fecha:</label>
        <select id="eventFilter" v-model="eventFilter">
          <option value="hoy">Hoy</option>
          <option value="mañana">Mañana</option>
          <option value="todos">Todos</option>
        </select>
      </div>
      
      <ul class="events-list">
        <li v-if="filteredEvents.length === 0" class="no-events">
          No hay eventos para esta fecha.
        </li>
        <li 
          v-for="event in filteredEvents" 
          :key="event.id"
          class="event-item"
          :title="event.description"
        >
          {{ event.title }} - {{ event.location }} ({{ event.category }}) - {{ event.date }} {{ event.time }}
        </li>
      </ul>

      <div class="event-form-section">
        <h3>Publica tu Evento</h3>
        <p>¿Eres anfitrión? Llena el formulario para publicar tu evento.</p>
        
        <form @submit.prevent="submitEvent" class="event-form">
          <div class="form-group">
            <label for="eventTitle">Título</label>
            <input 
              type="text" 
              id="eventTitle" 
              v-model="eventForm.title"
              placeholder="Nombre del evento" 
              required 
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="eventDate">Fecha</label>
              <input 
                type="date" 
                id="eventDate" 
                v-model="eventForm.date"
                required 
              />
            </div>
            <div class="form-group">
              <label for="eventTime">Hora</label>
              <input 
                type="time" 
                id="eventTime" 
                v-model="eventForm.time"
                required 
              />
            </div>
          </div>

          <div class="form-group">
            <label for="eventLocation">Ubicación</label>
            <input 
              type="text" 
              id="eventLocation" 
              v-model="eventForm.location"
              placeholder="Ciudad, lugar..." 
              required 
            />
          </div>

          <div class="form-group">
            <label for="eventCategory">Categoría</label>
            <select id="eventCategory" v-model="eventForm.category" required>
              <option value="" disabled>Selecciona categoría</option>
              <option value="Cultural">Cultural</option>
              <option value="Música">Música</option>
              <option value="Arte">Arte</option>
              <option value="Mercado">Mercado</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div class="form-group">
            <label for="eventDescription">Descripción (opcional)</label>
            <textarea 
              id="eventDescription" 
              v-model="eventForm.description"
              placeholder="Descripción breve del evento"
            ></textarea>
          </div>

          <button type="submit" class="btn-primary">Publicar Evento</button>
          <p v-if="formMessage" class="form-message">{{ formMessage }}</p>
        </form>
      </div>

      <div class="calendar-section">
        <h3>Calendario de Eventos</h3>
        <div class="calendar" v-html="calendarData"></div>
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

.events-filter {
  margin-bottom: 1.5rem;
}

.events-filter label {
  font-weight: 600;
  margin-right: 0.5rem;
}

.events-filter select {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #cbd5e1;
  max-width: 240px;
}

.events-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.event-item {
  background: #f9fafb;
  margin-bottom: 10px;
  padding: 0.8rem 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgb(0 0 0 / 0.05);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.event-item:hover {
  background-color: #e0e7ff;
}

.no-events {
  color: #9ca3af;
  font-style: italic;
  text-align: center;
  padding: 2rem;
}

.event-form-section {
  margin-top: 4rem;
}

.event-form-section h3 {
  color: #374151;
  margin-bottom: 0.5rem;
}

.event-form {
  background: #f9fafb;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.05);
  max-width: 600px;
  margin-top: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group label {
  font-weight: 600;
  color: #374151;
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  box-sizing: border-box;
}

.form-group textarea {
  min-height: 80px;
  resize: vertical;
}

.btn-primary {
  margin-top: 1.5rem;
  background-color: #2563eb;
  color: white;
  font-weight: 700;
  font-size: 1.125rem;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(37, 99, 235, 0.5);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #1e40af;
  transform: scale(1.05);
}

.form-message {
  color: #2563eb;
  font-weight: 700;
  margin-top: 1rem;
}

.calendar-section {
  margin-top: 3rem;
}

.calendar-section h3 {
  color: #2563eb;
  margin-bottom: 1rem;
}

.calendar {
  max-width: 700px;
  border-radius: 0.75rem;
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.05);
  padding: 1rem;
  background: #f9fafb;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .section-header h2 {
    font-size: 1.5rem;
  }
}
</style>