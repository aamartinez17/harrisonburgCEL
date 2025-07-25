<script setup>
import { ref, onMounted, computed } from 'vue';
import { getAuth } from 'firebase/auth';
import { RouterLink } from 'vue-router';

// --- Reactive Data for the User Profile ---
// In a real app, this data would be fetched from your database (like Firestore)
// using the user's ID from Firebase Auth.

const user = ref({
  name: 'Ana García',
  email: 'ana.garcia@example.com',
  profileImageUrl: 'https://placehold.co/150x150/bda566/0a3e8b?text=AG',
  joinDate: '2024-01-15',
});

const membership = ref({
  level: 'Emprendedor',
  // Using a date in the near future for demonstration
  expirationDate: '2025-08-31', 
  autoRenew: true,
});

const billing = ref({
  overdueFees: 25.00, // Example of an overdue fee
});

// --- Computed Properties ---
// These automatically recalculate when their dependencies change.

// Calculates if the membership is expired based on the current date.
const isExpired = computed(() => {
  const today = new Date();
  const expiry = new Date(membership.value.expirationDate);
  return expiry < today;
});

// Determines the membership status text and color.
const membershipStatus = computed(() => {
  if (isExpired.value) {
    return { text: 'Expirada', class: 'text-danger' };
  }
  return { text: 'Activa', class: 'text-success' };
});

// Formats dates for display.
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
};


// --- Lifecycle Hook ---
// Fetches user data when the component is mounted.
onMounted(() => {
  const auth = getAuth();
  const firebaseUser = auth.currentUser;

  if (firebaseUser) {
    // In a real app, you would use firebaseUser.uid to fetch a detailed 
    // profile from your database (e.g., Firestore).
    // For now, we'll just update the name and email from auth.
    user.value.name = firebaseUser.displayName || 'Miembro Valioso';
    user.value.email = firebaseUser.email;
  }
});
</script>

<template>
  <div class="profile-page bg-light">
    <div class="container py-5">

      <!-- Profile Header -->
      <div class="row mb-4">
        <div class="col-md-12 text-center">
            <img :src="user.profileImageUrl" alt="Profile Picture" class="profile-picture rounded-circle mb-3">
            <h1 class="display-5 fw-bold">Bienvenido, {{ user.name }}</h1>
            <p class="text-muted fs-5">{{ user.email }}</p>
        </div>
      </div>

      <!-- Dashboard Content -->
      <div class="row g-4">
        
        <!-- Left Column: Main Actions -->
        <div class="col-lg-8">
          <!-- Membership Status Card -->
          <div class="card shadow-sm mb-4">
            <div class="card-header bg-dark text-white">
              <h4 class="mb-0"><i class="bi bi-person-badge-fill me-2"></i>Estado de Membresía</h4>
            </div>
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-md-6">
                  <p><strong>Plan Actual:</strong> {{ membership.level }}</p>
                  <p><strong>Expira el:</strong> {{ formatDate(membership.expirationDate) }}</p>
                  <p><strong>Estado:</strong> <span :class="membershipStatus.class" class="fw-bold">{{ membershipStatus.text }}</span></p>
                </div>
                <div class="col-md-6 text-md-end">
                  <button v-if="isExpired" class="btn btn-danger me-2 mb-2">Renovar Ahora</button>
                  <button class="btn btn-primary me-2 mb-2">Cambiar de Plan</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Billing Information Card -->
          <div class="card shadow-sm">
             <div class="card-header bg-dark text-white">
              <h4 class="mb-0"><i class="bi bi-receipt me-2"></i>Facturación y Pagos</h4>
            </div>
            <div class="card-body">
               <div class="row align-items-center">
                 <div class="col-md-6">
                    <p v-if="billing.overdueFees > 0">
                      <strong>Balance Pendiente:</strong> 
                      <span class="text-danger fw-bold">${{ billing.overdueFees.toFixed(2) }}</span>
                    </p>
                    <p v-else class="text-success">Tu cuenta está al día.</p>
                    <p><strong>Auto-renovación:</strong> {{ membership.autoRenew ? 'Activada' : 'Desactivada' }}</p>
                 </div>
                 <div class="col-md-6 text-md-end">
                   <button v-if="billing.overdueFees > 0" class="btn btn-warning me-2 mb-2">Pagar Ahora</button>
                   <RouterLink to="/billing-history" class="btn btn-outline-secondary mb-2">Ver Historial</RouterLink>
                 </div>
               </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Quick Links -->
        <div class="col-lg-4">
          <div class="card shadow-sm">
            <div class="card-header bg-dark text-white">
              <h4 class="mb-0"><i class="bi bi-link-45deg me-2"></i>Acceso Rápido</h4>
            </div>
            <div class="list-group list-group-flush">
              <RouterLink to="/edit-profile" class="list-group-item list-group-item-action">
                <i class="bi bi-pencil-square me-2"></i>Editar Perfil Público
              </RouterLink>
              <RouterLink to="/events" class="list-group-item list-group-item-action">
                <i class="bi bi-calendar-event me-2"></i>Próximos Eventos
              </RouterLink>
              <RouterLink to="/directory" class="list-group-item list-group-item-action">
                <i class="bi bi-journal-bookmark-fill me-2"></i>Directorio de Miembros
              </RouterLink>
               <RouterLink to="/settings" class="list-group-item list-group-item-action">
                <i class="bi bi-gear-fill me-2"></i>Configuración de Cuenta
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-picture {
  width: 150px;
  height: 150px;
  border: 4px solid #fff;
  box-shadow: 0 0.5rem 1rem rgba(0,0,0,.15);
}
.card-header {
    border-bottom: 0;
}
.list-group-item i {
    color: var(--bs-primary);
    transition: color 0.2s ease-in-out;
}
.list-group-item:hover i {
    color: var(--bs-primary-dark);
}
</style>
