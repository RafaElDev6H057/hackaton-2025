<script setup lang="ts">
import { ref, onMounted } from "vue";
import NavMenu from "./NavMenu.vue";

const emit = defineEmits(["toggleSidebar"]);

const activeSection = ref("inicio");

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    activeSection.value = sectionId;
  }
}

// Opcional: Observa la sección activa para resaltar el menú
onMounted(() => {
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

  ["inicio", "eventos", "mapa", "escaneo", "comunidad"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) observer.observe(element);
  });
});
</script>

<template>
  <header class="sticky top-0 bg-white z-[9999] shadow-md">
    <nav
      class="flex items-center justify-between h-19 max-w-[1200px] mx-auto px-4"
    >
      <div class="flex items-center gap-4">
        <!-- Botón hamburguesa SOLO en móvil -->
        <button
          class="flex flex-col gap-[4px] bg-transparent border-none cursor-pointer p-2 rounded hover:bg-gray-100 transition-colors duration-300 sm:hidden"
          @click="$emit('toggleSidebar')"
          aria-label="Abrir menú"
        >
          <span
            class="w-6 h-[3px] bg-gray-700 rounded transition-all duration-300"
          ></span>
          <span
            class="w-6 h-[3px] bg-gray-700 rounded transition-all duration-300"
          ></span>
          <span
            class="w-6 h-[3px] bg-gray-700 rounded transition-all duration-300"
          ></span>
        </button>
        <!-- Logo -->
        <div
          class="flex items-center gap-2 font-extrabold text-2xl text-blue-600 select-none"
        >
          <img
            src="/logo_chico_nearnow.png"
            alt="Logo Chico NearNow"
            class="w-10 h-10"
          />
          <img
            src="/logo_largo_nearnow.png"
            alt="Logo Largo NearNow"
            class="w-48 -ml-4 hidden sm:inline"
          />
        </div>
      </div>
      <!-- Menú de navegación SOLO en desktop -->
      <div class="hidden sm:block">
        <NavMenu
          direction="row"
          :activeSection="activeSection"
          :onNavigate="scrollToSection"
        />
      </div>
    </nav>
  </header>
</template>
