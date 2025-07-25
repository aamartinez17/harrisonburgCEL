<template>
<header>
    <nav class="navbar navbar-expand-md" id="mainNavbar"> 
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/home">
                <img src="https://placehold.co/400x400/bda566/0a3e8b?text=CEL" alt="initials">
            </router-link>

            <button class="navbar-toggler" type="button" @click="toggleNavbar" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNavAltMarkup" ref="navbarCollapseRef">
                <div class="navbar-nav">
                    <router-link class="nav-link" aria-current="page" to="/home"><span>Home</span></router-link>
                    <router-link class="nav-link" to="/contact-Us"><span>Contact Us</span></router-link>
                    <template v-if="authReady">
                        <router-link class="nav-link" v-if="isLoggedIn" to="/profile"><span>Profile</span></router-link>
                        <router-link class="nav-link" v-if="isLoggedIn" to="/account"><span>Account</span></router-link>
                    </template>
                    
                    
                    <!-- <button class="nav-link" onclick="loadPage(this.value)" value="projects"><span>Projects</span></button> -->
                    <!-- <button class="nav-link" onclick="loadPage(this.value)" value="resume"><span>Resume</span></button>  -->
                </div>
                <div class="d-flex navbar-login" v-if="authReady">
                        <a class="nav-link"  v-if="isLoggedIn" @click=handleSignOut id="navbar-register-btn">Logout</a>
                        <router-link class="nav-link"  v-if="!isLoggedIn" to="/sign-in" id="navbar-signin-btn">Sign In</router-link>
                        <router-link class="nav-link"  v-if="!isLoggedIn" to="register" id="navbar-register-btn">Register</router-link>
                        
                </div>
            </div>
        </div>
    </nav>
</header>

<div id="to-top-button">
    <h3>To Top</h3>
    <i class="bi bi-file-arrow-up-fill"></i>
</div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter, useRoute } from 'vue-router'; // Import useRouter and useRoute
import { Collapse } from 'bootstrap'; // Import Collapse from bootstrap


const router = useRouter(); 
const route = useRoute(); // Get a reference to the current route

const isLoggedIn = ref(false);
const authReady = ref(false);
let auth;

// Create a ref for the navbar collapse DOM element
const navbarCollapseRef = ref(null);
let bsCollapse = null; // Variable to hold the bootstrap collapse instance

onMounted(() => {
    // console.log("test mount");

    // Initialize the Bootstrap Collapse instance
    if (navbarCollapseRef.value) {
        bsCollapse = new Collapse(navbarCollapseRef.value, {
        toggle: false // Set to false to prevent it from opening on initialization
        });
    }

    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = !!user; // A shorter way to set the boolean
        authReady.value = true;
    });
});

// Watch for changes in the route
watch(route, () => {
    // If the navbar is open, hide it
    if (navbarCollapseRef.value.classList.contains('show')) {
        bsCollapse.hide();
    }
});

const handleSignOut = () => {
    console.log("Signout");
    signOut(auth).then(() => {
        router.push("/");
    });
}


// This new function gives Vue explicit control over the navbar toggle
const toggleNavbar = () => {
  if (bsCollapse) {
    bsCollapse.toggle();
  }
};
</script>

<style scoped>
  a.nav-link {
    cursor: pointer;
  }
</style>