<script setup lang="ts">
import { ref } from "vue";

const testimonials = ref([
  {
    id: 1,
    name: "Ana Martínez",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5,
    text: "Gracias a NearNow descubrí el Restaurante La Minera y con el código QR obtuve un 2x1 en platos principales. La comida estuvo deliciosa y el servicio excelente. ¡Recomendado!",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4,
    text: "El sistema de misiones me motivó a visitar lugares que normalmente no hubiera considerado. La historia del Cerro de la Bufa que desbloqueé al escanear el código QR fue fascinante.",
  },
  {
    id: 3,
    name: "María González",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    text: "Conseguí el descuento del 15% en el Hotel Boutique después de completar tres misiones culturales. El hotel es encantador y la ubicación perfecta para explorar el centro histórico.",
  },
]);

const newComment = ref({
  text: "",
  rating: 0,
});

const submitComment = () => {
  if (!newComment.value.text || newComment.value.rating === 0) {
    alert("Por favor completa todos los campos");
    return;
  }

  // Aquí iría la lógica para enviar el comentario
  alert("¡Gracias por tu comentario!");

  // Reset form
  newComment.value = {
    text: "",
    rating: 0,
  };
};

const setRating = (rating: number) => {
  newComment.value.rating = rating;
};

const getStars = (rating: number) => {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
};
</script>

<template>
  <section class="section" role="region" aria-labelledby="comunidadTitle">
    <div class="container">
      <div class="section-header">
        <img
          class="min-w-full"
          src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Comunidad y experiencias"
        />
        <h2 id="comunidadTitle">Experiencias de la Comunidad</h2>
        <p>Lo que otros viajeros dicen sobre sus experiencias con NearNow.</p>
      </div>

      <div class="testimonials-list">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          class="testimonial"
        >
          <img
            :src="testimonial.avatar"
            :alt="testimonial.name"
            class="testimonial-avatar"
          />
          <div class="testimonial-content">
            <div class="testimonial-author">{{ testimonial.name }}</div>
            <div class="testimonial-rating">
              {{ getStars(testimonial.rating) }}
            </div>
            <p class="testimonial-text">{{ testimonial.text }}</p>
          </div>
        </div>
      </div>

      <div class="comment-form">
        <h4>Comparte tu experiencia</h4>
        <textarea
          v-model="newComment.text"
          placeholder="Cuéntanos sobre tu experiencia con NearNow..."
        ></textarea>
        <div class="rating-select">
          <span>Calificación:</span>
          <div class="stars">
            <button
              v-for="star in 5"
              :key="star"
              type="button"
              class="star-btn"
              :class="{ active: star <= newComment.rating }"
              @click="setRating(star)"
            >
              ★
            </button>
          </div>
        </div>
        <button class="btn-primary" @click="submitComment">
          Enviar comentario
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

.testimonials-list {
  max-width: 800px;
  margin: 0 auto 3rem;
}

.testimonial {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: flex-start;
}

.testimonial-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.testimonial-content {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 0.75rem;
  flex-grow: 1;
}

.testimonial-author {
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: #111827;
}

.testimonial-rating {
  color: #f59e0b;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.testimonial-text {
  font-size: 0.9rem;
  color: #4b5563;
  margin: 0;
}

.comment-form {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.75rem;
  max-width: 600px;
  margin: 0 auto;
}

.comment-form h4 {
  margin-bottom: 1rem;
  color: #111827;
}

.comment-form textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;
}

.rating-select {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.rating-select span {
  color: #374151;
  font-weight: 600;
}

.stars {
  display: flex;
  gap: 0.25rem;
}

.star-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #d1d5db;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0;
}

.star-btn:hover,
.star-btn.active {
  color: #f59e0b;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #1e40af;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .testimonial {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .testimonial-avatar {
    align-self: center;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }

  .rating-select {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
