<script setup lang="ts">
const props = defineProps<{
  direction?: "row" | "col";
  onNavigate?: (id: string) => void;
  activeSection?: string;
}>();

const menuItems = [
  { id: "inicio", title: "Inicio" },
  { id: "eventos", title: "Eventos" },
  { id: "mapa", title: "Mapa" },
  { id: "escaneo", title: "Reservar" },
  { id: "comunidad", title: "Comentarios" },
];

function handleClick(id: string) {
  props.onNavigate?.(id);
}
</script>

<template>
  <ul :class="direction === 'row' ? 'flex gap-2' : 'flex flex-col'">
    <li
      v-for="item in menuItems"
      :key="item.id"
      :class="{
        'bg-indigo-100 text-blue-600 font-semibold': activeSection === item.id,
      }"
      class="rounded transition-colors"
    >
      <a
        href="#"
        @click.prevent="handleClick(item.id)"
        class="flex items-center gap-2 px-3 py-2 hover:text-blue-600 hover:bg-gray-100 rounded transition-all"
      >
        <span class="text-sm">{{ item.title }}</span>
      </a>
    </li>
  </ul>
</template>
