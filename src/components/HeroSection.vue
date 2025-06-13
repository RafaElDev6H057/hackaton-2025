<script setup lang="ts">
const scrollToMap = () => {
  const mapSection = document.getElementById('mapa')
  if (mapSection) {
    mapSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section class="hero" role="region" aria-label="Sección principal">
    <div class="hero-content">
      <h1>Explora tu mundo,<br />un escaneo a la vez.</h1>
      <p>Descubre eventos, arte y experiencias en tiempo real al alcance de tu mano. Completa misiones y gana recompensas.</p>
      <button class="btn-primary" @click="scrollToMap">
        Comienza a explorar
      </button>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
  color: white;
  padding: 6rem 1rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80') center/cover;
  opacity: 0.15;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 3.5rem;
  line-height: 1.1;
  margin-bottom: 1rem;
  font-weight: 800;
  color: white;
}

.hero p {
  font-size: 1.25rem;
  max-width: 480px;
  margin: 0 auto 2rem;
  font-weight: 500;
  color: #dbeafe;
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

.btn-primary:hover,
.btn-primary:focus-visible {
  background-color: #1e40af;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .hero {
    padding: 4rem 1rem;
  }
  
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .hero p {
    font-size: 1.1rem;
  }
}
</style>