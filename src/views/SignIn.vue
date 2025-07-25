<script setup>
import { ref } from 'vue';
import {getAuth, 
    signInWithEmailAndPassword,
    signInWithPopup, 
    GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from 'vue-router'

// Create reactive variables to store the user's input.
// The `v-model` directive in the template will keep these in sync with the input fields.
const email = ref('');
const password = ref('');
const router = useRouter();
const errMsg = ref();

/**
 * Handles the login submission.
 * For now, it just logs the credentials to the console.
 * You can replace this with your Firebase authentication logic.
 */
const handleLogin = async () => {

  // Prevent the form from submitting if fields are empty (basic validation)
  if (!email.value || !password.value) {
    alert('Please enter both email and password.');
    return;
  }

//   console.log("Successful registered!");
//         await router.push('/');

  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(async (data) => {
        console.log("Successful Signin!");
        await router.push('/Profile');
        // document.querySelector().classList.remove('user-hidden');
    })
    .catch((error) => {
        console.log(error.code);
        switch (error.code) {
            case "auth/invalid-email":
                errMsg.value = "invalid email";
                break;
            case "auth/user-not-found":
                errMsg.value = "No account with that email was found";
                break;
            case "auth/wrong-password":
                errMsg.value = "incorrect password";
                break;
            default:
                errMsg.value = "Email or password was incorrect";
                break;
        }
    });
  
  console.log('Attempting to log in with:');
  console.log('Email:', email.value);
  console.log('Password:', password.value);

  // TODO: Add your Firebase signInWithEmailAndPassword() logic here
};

const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user);
            router.push("/Profile");
        })
        .catch((error) => {

        });
    };
</script>

<template>
  <!-- Main container with a light gray background, filling the screen -->
  <div class="d-flex align-items-center justify-content-center min-vh-100 bg-light">
    
    <!-- Login form card -->
    <div class="card shadow-sm" style="width: 100%; max-width: 420px;">
      <div class="card-body p-4 p-md-5">
        
        <!-- Header -->
        <div class="text-center mb-4">
          <h1 class="h3 fw-bold mb-3">
            Sign In
          </h1>
          <p class="text-muted">
            Welcome back! Please enter your details.
          </p>
        </div>

        <!-- 
          The @submit.prevent modifier stops the default browser behavior of reloading the page on form submission.
          Instead, it will call our `handleLogin` function.
        -->
        <form @submit.prevent="handleLogin">
          
          <!-- Email Input -->
          <div class="mb-3">
            <label for="email" class="form-label">
              Email Address
            </label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              autocomplete="email" 
              required 
              v-model="email"
              class="form-control"
              placeholder="you@example.com"
            />
          </div>

          <!-- Password Input -->
          <div class="mb-3">
            <label for="password" class="form-label">
              Password
            </label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              autocomplete="current-password" 
              required 
              v-model="password"
              class="form-control"
              placeholder="••••••••"
            />
          </div>
          <p v-if="errMsg"> {{ errMsg }}</p>

          <!-- Submit Button -->
          <div class="d-grid">
            <button 
              type="submit" 
              class="btn btn-primary btn-lg"
            >
              Sign In
            </button>
          </div>
        </form>
       <p class="my-3 text-center">or</p>
        <hr/>
        <button @click=signInWithGoogle id='google-signin-button' class="btn mx-auto">
            <i class="bi bi-google"></i>Sign in WIth Google
        </button>
        <div class="my-3 text-center">
            <router-link to="/register">Need an Account?</router-link><br/>
            <router-link to="/">back to home</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Scoped styles ensure that these styles only apply to this component. */
/* You can add custom styles here if needed. */
</style>
