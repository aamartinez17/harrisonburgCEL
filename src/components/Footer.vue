<template>
  <!-- Footer Component -->
  <footer class="footer">
    <div class="footer-container">
      <!-- Top section: Social links and action buttons -->
      <div class="top-section">
        
        <!-- Social Media Icons -->
        <div class="social-links">
          <a href="#" class="social-link">
            <i class="bi bi-twitter-x"></i>
            <span class="sr-only">Twitter</span>
          </a>
          <a href="#" class="social-link">
            <i class="bi bi-facebook"></i>
            <span class="sr-only">Facebook</span>
          </a>
          <a href="#" class="social-link">
            <i class="bi bi-instagram"></i>
            <span class="sr-only">Instagram</span>
          </a>
          <a href="#" class="social-link">
            <i class="bi bi-linkedin"></i>
            <span class="sr-only">LinkedIn</span>
          </a>
        </div>

        <!-- Action Buttons: Conditionally render based on login state -->
        <div class="action-buttons">
          <!-- Show these buttons if the user is NOT logged in -->
          <template v-if="!isLoggedIn">
            <RouterLink to="/sign-in" class="btn btn-signin">
              Sign In
            </RouterLink>
            <RouterLink to="/register" class="btn btn-register">
              Register
            </RouterLink>
          </template>
          <!-- Show this button if the user IS logged in -->
          <template v-else>
            <button @click="handleSignOut" class="btn btn-logout">
              Logout
            </button>
          </template>
        </div>
      </div>

      <!-- Divider -->
      <hr class="divider">

      <!-- Bottom section: Sponsorship and copyright -->
      <div class="bottom-section">
        <p class="sponsorship-text">
          Sponsored by 
          <a href="https://www.casatech.org" target="_blank" rel="noopener noreferrer" class="casatech-link">
            <!-- Specially styled CasaTech logo -->
            <span class="font-casa">Casa</span><span class="font-tech">Tech</span>
          </a>
          LLC
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const isLoggedIn = ref(false);
const router = useRouter();
let auth;

// Set up a listener that watches for changes in the user's login state.
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user; // Sets isLoggedIn to true if user exists, false otherwise.
  });
});

// Function to handle user sign-out.
const handleSignOut = () => {
  signOut(auth).then(() => {
    // Redirect to the home page after successful sign-out.
    router.push('/');
  }).catch((error) => {
    console.error("Sign out error:", error);
  });
};
</script>

<style scoped>

</style>
