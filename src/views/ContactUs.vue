<script setup>
import { ref } from 'vue';

// Reactive variables for the form fields
const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const formSubmitted = ref(false);

// Function to handle form submission
const handleSubmit = () => {
  // Basic validation
  if (!contactForm.value.name || !contactForm.value.email || !contactForm.value.message) {
    alert('Por favor, completa todos los campos requeridos.');
    return;
  }

  // In a real application, you would send this data to a server or a service like EmailJS.
  console.log('Form data submitted:', contactForm.value);

  // Show a success message and clear the form
  formSubmitted.value = true;
};
</script>

<template>
  <div class="contact-us-page py-5">
    <div class="container">

      <!-- Page Header -->
      <div class="text-center mb-5">
        <h1 class="display-4 fw-bold">Contáctanos</h1>
        <p class="lead text-muted">¿Tienes preguntas? Estamos aquí para ayudarte.</p>
      </div>

      <!-- Main Content Area -->
      <div class="card shadow-lg">
        <div class="card-body p-0">
          <div class="row g-0">

            <!-- Left Side: Contact Form -->
            <div class="col-lg-7 p-4 p-md-5">
              <div v-if="formSubmitted" class="alert alert-success h-100 d-flex flex-column justify-content-center text-center">
                  <h4 class="alert-heading">¡Gracias!</h4>
                  <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>
              </div>
              <form v-else @submit.prevent="handleSubmit">
                <h3 class="fw-bold mb-4">Envíanos un Mensaje</h3>
                <!-- Name Input -->
                <div class="mb-3">
                  <label for="name" class="form-label">Nombre Completo</label>
                  <input type="text" class="form-control" id="name" v-model="contactForm.name" required>
                </div>
                <!-- Email Input -->
                <div class="mb-3">
                  <label for="email" class="form-label">Correo Electrónico</label>
                  <input type="email" class="form-control" id="email" v-model="contactForm.email" required>
                </div>
                 <!-- Subject Input -->
                 <div class="mb-3">
                  <label for="subject" class="form-label">Asunto</label>
                  <input type="text" class="form-control" id="subject" v-model="contactForm.subject">
                </div>
                <!-- Message Textarea -->
                <div class="mb-3">
                  <label for="message" class="form-label">Mensaje</label>
                  <textarea class="form-control" id="message" rows="5" v-model="contactForm.message" required></textarea>
                </div>
                <!-- Submit Button -->
                <button type="submit" class="btn btn-lg">Enviar Mensaje</button>
              </form>
            </div>

            <!-- Right Side: Contact Information -->
            <div class="col-lg-5 text-white p-4 p-md-5 contact-info-panel">
               <h3 class="fw-bold mb-4">Información de Contacto</h3>
               <ul class="list-unstyled">
                 <li class="d-flex align-items-start mb-4">
                   <i class="bi bi-geo-alt-fill fs-4 me-3"></i>
                   <div>
                     <strong>Oficina</strong><br>
                     123 Main Street<br>
                     Harrisonburg, VA 22801
                   </div>
                 </li>
                 <li class="d-flex align-items-start mb-4">
                   <i class="bi bi-telephone-fill fs-4 me-3"></i>
                   <div>
                     <strong>Teléfono</strong><br>
                     (540) 123-4567
                   </div>
                 </li>
                 <li class="d-flex align-items-start mb-4">
                   <i class="bi bi-envelope-fill fs-4 me-3"></i>
                   <div>
                     <strong>Email</strong><br>
                     info@harrisonburgcel.org
                   </div>
                 </li>
               </ul>
               <!-- Map Placeholder -->
               <div class="mt-4">
                 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d35918.71089395359!2d-78.8978923382319!3d38.44090086827158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b492c33f077155%3A0x84e65b9dabd7b5f!2sHarrisonburg%2C%20VA!5e0!3m2!1sen!2sus!4v1753419432144!5m2!1sen!2sus" class="container" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
