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
    class="relative overflow-hidden bg-gradient-to-br from-[#4f46e5] to-[#3b82f6] text-white py-24 px-4 text-center"
    role="region"
    aria-label="Sección principal"
  >
    <!-- Fondo con imagen y opacidad -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      :style="{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)',
        opacity: '0.55',
        height: '',
      }"
    ></div>

    <div class="relative z-10 max-w-[1200px] mx-auto">
      <h1
        class="text-5xl md:text-6xl font-extrabold leading-[1.1] mb-4 text-white"
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
