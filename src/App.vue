<script setup lang="ts">
import { ref, onMounted } from "vue";
import AppHeader from "./components/AppHeader.vue";
import AppSidebar from "./components/AppSidebar.vue";
import HeroSection from "./components/HeroSection.vue";
import EventsSection from "./components/EventsSection.vue";
import MapSection from "./components/MapSection.vue";
import CommunitySection from "./components/CommunitySection.vue";
import ScanSection from "./components/ScanSection.vue";
import AchievementsSection from "./components/AchievementsSection.vue";
import AppFooter from "./components/AppFooter.vue";
import { useGameState } from "./composables/useGameState";

const sidebarOpen = ref(false);
const { initializeGame } = useGameState();

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const closeSidebar = () => {
  sidebarOpen.value = false;
};

onMounted(() => {
  initializeGame();
});
</script>

<template>
  <div class="app">
    <AppHeader @toggle-sidebar="toggleSidebar" />
    <AppSidebar :open="sidebarOpen" @close="closeSidebar" />

    <main class="main-content" :class="{ 'sidebar-open': sidebarOpen }">
      <HeroSection id="inicio" />
      <EventsSection id="eventos" />
      <MapSection id="mapa" />
      <ScanSection id="escaneo" />
      <!--<AchievementsSection id="logros" /> -->
      <CommunitySection id="comunidad" />
    </main>

    <AppFooter />

    <!-- Overlay para cerrar sidebar en móvil -->
    <div v-if="sidebarOpen" class="sidebar-overlay" @click="closeSidebar"></div>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  transition: margin-left 0.3s ease;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: none;
}

@media (max-width: 768px) {
  .sidebar-overlay {
    display: block;
  }
}

@media (min-width: 769px) {
  .main-content.sidebar-open {
    margin-left: 280px;
  }
}
</style>
