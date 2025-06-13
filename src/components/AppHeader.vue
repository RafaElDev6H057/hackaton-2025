<script setup lang="ts">
defineEmits<{
  toggleSidebar: [];
}>();
</script>

<template>
  <header class="header">
    <nav class="nav">
      <div class="nav-left">
        <button
          class="hamburger-btn"
          @click="$emit('toggleSidebar')"
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div class="logo">
          <img src="/logo_chico_nearnow.png" alt="Logo Chico NearNow" />
          <img
            class="min-w-46 -ml-4"
            src="/logo_largo_nearnow.png"
            alt="Logo Largo NearNow"
          />
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  background: white;
  z-index: 50;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.75rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hamburger-btn {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.hamburger-btn:hover {
  background-color: #f3f4f6;
}

.hamburger-btn span {
  width: 24px;
  height: 3px;
  background-color: #374151;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 800;
  font-size: 1.5rem;
  color: #2563eb;
  user-select: none;
}

.logo img {
  width: 40px;
  height: 40px;
}

@media (max-width: 768px) {
  .logo span {
    display: none;
  }
}
</style>
