<script setup lang="ts">
import { ref, onMounted } from "vue";

defineProps<{
  open: boolean;
}>();

defineEmits<{
  close: [];
}>();

const menuItems = ref([
  { id: "inicio", title: "Inicio", icon: "🏠" },
  { id: "eventos", title: "Eventos", icon: "🎉" },
  { id: "mapa", title: "Mapa", icon: "🗺️" },
  { id: "escaneo", title: "Reservar", icon: "📱" },
  { id: "comunidad", title: "Comentarios", icon: "💬" },
]);

const activeSection = ref("inicio");

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    activeSection.value = sectionId;
  }
};

onMounted(() => {
  // Observar secciones para actualizar el menú activo
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          activeSection.value = entry.target.id;
        }
      });
    },
    { threshold: 0.5 }
  );

  menuItems.value.forEach((item) => {
    const element = document.getElementById(item.id);
    if (element) {
      observer.observe(element);
    }
  });
});
</script>

<template>
  <aside class="sidebar" :class="{ 'sidebar-open': open }">
    <div class="sidebar-header">
      <h3>Navegación</h3>
      <button
        class="close-btn"
        @click="$emit('close')"
        aria-label="Cerrar menú"
      >
        ×
      </button>
    </div>

    <nav class="sidebar-nav">
      <ul class="menu-list">
        <li
          v-for="item in menuItems"
          :key="item.id"
          class="menu-item"
          :class="{ active: activeSection === item.id }"
        >
          <a
            href="#"
            @click.prevent="scrollToSection(item.id)"
            class="menu-link"
          >
            <span class="menu-icon">{{ item.icon }}</span>
            <span class="menu-text">{{ item.title }}</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- <div class="sidebar-footer">
      <div class="user-info">
        <div class="user-avatar">
          <span>👤</span>
        </div>
        <div class="user-details">
          <p class="user-name">Explorador</p>
          <p class="user-level">Nivel 1</p>
        </div>
      </div>
    </div> -->
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: -280px;
  width: 280px;
  height: 100vh;
  background: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
  z-index: 200;
  display: flex;
  flex-direction: column;
}

.sidebar-open {
  left: 0;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.sidebar-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #374151;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background-color: #f3f4f6;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
}

.menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-item {
  margin-bottom: 4px;
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #374151;
  transition: all 0.3s ease;
  border-radius: 0 25px 25px 0;
  margin-right: 1rem;
}

.menu-link:hover {
  background-color: #f3f4f6;
  color: #2563eb;
}

.menu-item.active .menu-link {
  background-color: #e0e7ff;
  color: #2563eb;
  font-weight: 600;
}

.menu-icon {
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
}

.menu-text {
  font-size: 0.95rem;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background-color: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.user-details {
  flex: 1;
}

.user-name {
  margin: 0;
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.user-level {
  margin: 0;
  color: #6b7280;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    left: -100%;
  }

  .sidebar-open {
    left: 0;
  }
}
</style>
