<script setup lang="ts">
import { ref } from "vue";
import AddressForm from "../components/AddressForm.vue";

const mapContainer = ref<HTMLElement>();
</script>

<template>
  <section class="section" role="region" aria-labelledby="mapaTitle">
    <div class="container">
      <div class="section-header">
        <img
          src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Mapa de experiencias"
        />
        <h2 id="mapaTitle">Mapa de Experiencias</h2>
        <p class="mb-0">
          Descubre lugares cercanos y eventos disponibles en tu área.
        </p>
      </div>

      <div class="max-w-6xl mx-auto" ref="mapContainer">
        <!-- <div class="map-placeholder">
          <h3>Mapa Interactivo</h3>
          <p>
            Aquí se mostraría un mapa interactivo con los eventos disponibles en
            tu zona
          </p>
        </div> -->
        <AddressForm />
      </div>

      <div class="features-grid">
        <div class="card">
          <img
            class="card-img"
            src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Lugares destacados"
          />
          <h3>Lugares Destacados</h3>
          <ul class="featured-locations">
            <li>Cerro de la Bufa - Eventos culturales disponibles</li>
            <li>Mina El Edén - Tours y experiencias históricas</li>
            <li>Catedral de Zacatecas - Conciertos y eventos religiosos</li>
          </ul>
        </div>
        <div class="card">
          <img
            class="card-img"
            src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Eventos cercanos"
          />
          <h3>Eventos Cercanos</h3>
          <ul class="nearby-events">
            <li>Festival de Música - Este fin de semana</li>
            <li>Exposición de Arte - Disponible todo el mes</li>
            <li>Tour Gastronómico - Reservas abiertas</li>
          </ul>
        </div>
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

.map-container {
  height: 400px;
  background: #f3f4f6;
  border-radius: 1rem;
  position: relative;
  margin-bottom: 2rem;
  background-image: url("https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1493&q=80");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-placeholder {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.map-placeholder h3 {
  margin: 0 0 1rem 0;
  color: #2563eb;
}

.map-placeholder p {
  margin: 0;
  color: #6b7280;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.card {
  background: #f9fafb;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.05);
  transition: transform 0.3s ease;
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
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #1e40af;
}

.featured-locations,
.nearby-events {
  list-style: none;
  padding: 0;
  margin: 0;
}

.featured-locations li,
.nearby-events li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.9rem;
  color: #374151;
}

.featured-locations li:last-child,
.nearby-events li:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .map-container {
    height: 300px;
  }

  .map-placeholder {
    padding: 1.5rem;
  }
}
</style>
