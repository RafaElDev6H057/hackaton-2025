<script setup>
const scrollToMap = () => {
  const mapSection = document.getElementById("mapa");
  if (mapSection) {
    mapSection.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <section
    class="relative overflow-hidden bg-black/90 text-white py-24 px-4 text-center h-screen"
    role="region"
    aria-label="Sección principal"
  >
    <!-- Fondo con imagen y opacidad -->
    <div
      class="absolute inset-0 bg-cover bg-center h-screen animated-zoom"
      :style="{
        backgroundImage: 'url(/hero_zacatecas_3.webp)',
        opacity: '0.55',
        height: '100%',
      }"
    ></div>

    <div class="relative z-10 max-w-[1200px] mx-auto pt-16">
      <h1
        class="text-5xl md:text-6xl font-extrabold leading-[1.1] mb-4 text-white!"
      >
        Explora tu mundo,<br />un escaneo a la vez.
      </h1>

      <p
        class="text-xl md:text-xl max-w-[480px] mx-auto mb-8 font-medium text-white!"
      >
        Descubre eventos, arte y experiencias en tiempo real al alcance de tu
        mano. Completa misiones y gana recompensas.
      </p>

      <button
        class="bg-blue-600 hover:bg-blue-800 focus:bg-blue-800 border-none text-white font-bold text-lg py-3 px-8 rounded-xl cursor-pointer shadow-[0_6px_15px_rgba(37,99,235,0.5)] transition-all duration-300 ease-in-out hover:scale-105 focus:scale-105 focus:outline-none"
        @click="scrollToMap"
      >
        Comienza a explorar
      </button>
    </div>
  </section>
</template>

<style scoped>
@keyframes zoomInOut {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.animated-zoom {
  animation: zoomInOut 12s ease-in-out infinite;
}
</style>
