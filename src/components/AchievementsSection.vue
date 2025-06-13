<script setup lang="ts">
import { ref } from 'vue'

const achievements = ref([
  {
    id: 1,
    title: 'Descubridor',
    description: 'Has visitado 10 lugares y desbloqueado este rango.',
    image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    progress: 3,
    target: 10
  },
  {
    id: 2,
    title: 'Aventurero',
    description: 'Has visitado 25 lugares y desbloqueado este rango.',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    progress: 3,
    target: 25
  },
  {
    id: 3,
    title: 'Amante Cultural',
    description: 'Asiste a 5 eventos culturales diferentes.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    progress: 1,
    target: 5
  }
])
</script>

<template>
  <section class="section" role="region" aria-labelledby="logrosTitle">
    <div class="container">
      <div class="section-header">
        <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1450&q=80" alt="Sistema de logros" />
        <h2 id="logrosTitle">Sistema de Logros</h2>
        <p>Desbloquea estampas digitales y sube de nivel cada vez que exploras un lugar o evento.</p>
      </div>
      
      <div class="achievements-grid">
        <div 
          v-for="achievement in achievements" 
          :key="achievement.id"
          class="achievement-card"
        >
          <img 
            :src="achievement.image" 
            :alt="achievement.title"
            class="achievement-img" 
          />
          <h3>{{ achievement.title }}</h3>
          <p>{{ achievement.description }}</p>
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ width: `${(achievement.progress / achievement.target) * 100}%` }"
            ></div>
          </div>
          <p class="progress-text">
            {{ achievement.progress }}/{{ achievement.target }} completados
          </p>
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

.section-header p {
  font-size: 1rem;
  color: #6b7280;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.achievement-card {
  background: #f9fafb;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.05);
  transition: transform 0.3s ease;
  text-align: center;
}

.achievement-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgb(37 99 235 / 0.3);
}

.achievement-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
}

.achievement-card h3 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #1e40af;
}

.achievement-card p {
  margin: 0 0 1rem 0;
  color: #6b7280;
}

.progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  margin: 1rem 0 0.5rem 0;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #2563eb;
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0;
}

@media (max-width: 768px) {
  .section-header h2 {
    font-size: 1.5rem;
  }
}
</style>