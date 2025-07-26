<script setup>
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

// This onMounted hook will run after the component's HTML has been rendered.
// We use it to set up our scroll-triggered animations.
onMounted(() => {
  // Create an Intersection Observer. This is a modern browser API that efficiently
  // watches for when elements enter or exit the browser's viewport.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // If the element is currently visible in the viewport...
      if (entry.isIntersecting) {
        // Add the 'visible' class to trigger our CSS animation.
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1 // Trigger the animation when at least 10% of the element is visible.
  });

  // Find all elements that we want to animate (those with the 'animate-on-scroll' class).
  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
  // Tell the observer to start watching each of these elements.
  elementsToAnimate.forEach((el) => observer.observe(el));
});
</script>

<template>
  <div>
    <!-- Section 1: Hero with Ken Burns Effect -->
    <section class="hero-section text-white text-center home-section-1">
        <div class="container d-flex flex-column justify-content-center h-100 hero-content">
            <h1 class="display-3 fw-bold animate-on-scroll fade-in-up">
                Construyendo Puentes, Creando Oportunidades
            </h1>
            <p class="lead fs-4 mt-3 animate-on-scroll fade-in-up delay-1">
                Uniendo y potenciando a la comunidad de negocios Latinos en Harrisonburg, VA.
            </p>
            <div class="mt-4 animate-on-scroll fade-in-up delay-2">
                <RouterLink to="/register" class="btn btn-primary btn-lg pulse-animation">
                ¡Únete como Miembro!
                </RouterLink>
            </div>
        </div>
    </section>

    <!-- Section 2: Who We Are -->
    <section class="py-5 home-section-2">
  <div class="container">
    <div class="row align-items-center justify-content-center">
          <div class="col-lg-4 animate-on-scroll slide-in-left mission-statement">
            <h2 class="display-5 fw-bold mb-3">Nuestra Misión</h2>
            <p class="text-muted fs-5">
              HarrisonburgCEL es el punto de encuentro para profesionales y emprendedores Latinos. Nuestra misión es fomentar el crecimiento económico, crear conexiones valiosas y abogar por los intereses de nuestra comunidad para construir un futuro próspero para todos.
            </p>
          </div>
          <div class="col-lg-4 animate-on-scroll slide-in-right">
            <img src="../../public/img/meeting-group.png" class="img-fluid rounded" alt="Diverse community members networking">
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: What We Offer -->
    <section class="bg-light py-5 home-section-3">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold">¿Qué Ofrecemos?</h2>
          <p class="lead text-muted">Beneficios exclusivos para nuestros miembros.</p>
        </div>
        <div class="row g-4">
          <!-- Card 1: Networking -->
          <div class="col-lg-4 d-flex align-items-stretch animate-on-scroll fade-in-up">
            <div class="card text-center shadow-sm w-100">
              <div class="card-body p-4">
                <div class="feature-icon-box text-white mb-3">
                  <i class="bi bi-people-fill"></i>
                </div>
                <h3 class="card-title fw-bold">Eventos de Networking</h3>
                <p class="card-text text-muted">Conéctate con líderes, mentores y colaboradores en nuestros eventos sociales y profesionales diseñados para inspirar.</p>
              </div>
            </div>
          </div>
          <!-- Card 2: Resources -->
          <div class="col-lg-4 d-flex align-items-stretch animate-on-scroll fade-in-up delay-1">
            <div class="card text-center shadow-sm w-100">
              <div class="card-body p-4">
                <div class="feature-icon-box text-white mb-3">
                  <i class="bi bi-briefcase-fill"></i>
                </div>
                <h3 class="card-title fw-bold">Recursos de Negocios</h3>
                <p class="card-text text-muted">Accede a talleres, seminarios y recursos educativos para llevar tu negocio o carrera al siguiente nivel.</p>
              </div>
            </div>
          </div>
          <!-- Card 3: Advocacy -->
          <div class="col-lg-4 d-flex align-items-stretch animate-on-scroll fade-in-up delay-2">
            <div class="card text-center shadow-sm w-100">
              <div class="card-body p-4">
                <div class="feature-icon-box text-white mb-3">
                  <i class="bi bi-megaphone-fill"></i>
                </div>
                <h3 class="card-title fw-bold">Defensa Comunitaria</h3>
                <p class="card-text text-muted">Somos tu voz. Trabajamos para asegurar que las contribuciones y necesidades de nuestra comunidad sean escuchadas.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Final CTA -->
    <section class="py-5 text-center final-cta home-section-4">
        <div class="container">
            <h2 class="display-4 fw-bold animate-on-scroll fade-in-up">¿Listos para Crecer con Nosotros?</h2>
            <p class="lead fs-4 text-muted my-3 animate-on-scroll fade-in-up delay-1">Únete a una comunidad vibrante de profesionales y emprendedores Latinos en Harrisonburg.</p>
            <div class="mt-4 animate-on-scroll fade-in-up delay-2">
                <RouterLink to="/register" class="btn btn-primary btn-lg pulse-animation">
                    Regístrate Hoy Mismo
                </RouterLink>
            </div>
        </div>
    </section>

  </div>
</template>

<style scoped>

</style>
