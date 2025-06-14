<script setup>
import { ref, onMounted } from "vue";
import NavMenu from "./NavMenu.vue";

const props = defineProps({
  open: Boolean,
});
const emit = defineEmits(["close"]);

const activeSection = ref("inicio");

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    activeSection.value = sectionId;
    emit("close");
  }
}

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
  <aside
    class="fixed top-0 h-full w-[280px] bg-white shadow-md transition-all duration-300 z-[200] flex flex-col sm:hidden"
    :class="open ? 'left-0' : '-left-full'"
  >
    <div
      class="flex items-center justify-between px-4 py-6 border-b border-gray-200"
    >
      <h3 class="text-lg font-bold text-gray-700">Navegación</h3>
      <button
        @click="emit('close')"
        class="text-gray-500 text-2xl hover:bg-gray-100 px-2 py-1 rounded transition-colors duration-200"
        aria-label="Cerrar menú"
      >
        ×
      </button>
    </div>
    <nav class="flex-1 overflow-y-auto py-4">
      <NavMenu
        direction="col"
        :activeSection="activeSection"
        :onNavigate="scrollToSection"
      />
    </nav>
  </aside>
</template>
