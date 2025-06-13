<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <p>© {{ currentYear }} NearNow. Todos los derechos reservados.</p>
      <div class="social-links">
        <a href="#" aria-label="Facebook">
          <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" />
        </a>
        <a href="#" aria-label="Instagram">
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" />
        </a>
        <a href="#" aria-label="Twitter">
          <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="Twitter" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #f3f4f6;
  padding: 2rem 1rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content p {
  margin: 0;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  transition: transform 0.3s ease;
}

.social-links a:hover {
  transform: scale(1.1);
}

.social-links img {
  width: 24px;
  height: 24px;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>