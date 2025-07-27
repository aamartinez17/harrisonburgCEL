<script setup>
import { ref } from 'vue';

// This data is hardcoded for now but can be easily replaced
// with data fetched from a database.
const sponsors = ref([
  // Gold Tier Sponsor
  {
    id: 1,
    tier: 'Gold',
    name: 'Innovatech Solutions',
    phonenumber: '(540) 745-5555',
    website: 'www.websiteplacehoder.com',
    email: 'support@companyemail.com',
    address: '123 Main st',
    location: 'Harrisonburg, VA',
    image: '/img/Sponsor1.png',
    description: 'Innovatech Solutions es un proveedor líder de software empresarial en la nube. Nos enorgullece apoyar iniciativas comunitarias que fomentan el crecimiento y la colaboración. Nuestra misión es dotar a las empresas de las herramientas necesarias para triunfar en un mundo digital, y nuestra alianza refleja un profundo compromiso con el desarrollo local y el avance tecnológico.',
    tagline: 'Impulsando las empresas del mañana, hoy.'
  },
  // Silver Tier Sponsors
  {
    id: 2,
    tier: 'Silver',
    name: 'Garcia\'s Eatery',
    address: '456 Rock st',
    location: 'Harrisonburg, VA',
    image: '/img/Sponsor2.png',
    description: 'Auténtica cocina latina hecha con pasión. Un favorito del barrio para cenas familiares y ocasiones especiales.'
  },
  {
    id: 3,
    tier: 'Silver',
    name: 'Martinez Auto Repair',
    address: '546 N Main St',
    location: 'Harrisonburg, VA',
    image: '/img/Sponsor3.png',
    description: 'Servicio automotriz confiable y honesto. Desde cambios de aceite hasta reparaciones importantes, lo mantenemos seguro en la carretera.'
  },
  // Bronze Tier Sponsors
  {
    id: 4,
    tier: 'Bronze',
    name: 'Rodriguez Legal Services',
    location: 'Downtown Harrisonburg, VA'
  },
  {
    id: 5,
    tier: 'Bronze',
    name: 'Chen\'s Accounting',
    location: 'East Rock, Harrisonburg, VA'
  }
]);
</script>

<template>
  <div class="sponsors-page">

    <div class="py-5">
      <div class="text-center mb-5">
        <h1 class="display-4 fw-bold">Nuestros valiosos patrocinadores</h1>
        <p class="lead text-muted">Un sincero agradecimiento a las empresas que apoyan a nuestra comunidad.</p>
      </div>
      <div class="container mx-auto my-3 ticker-wrap">
      <div class="ticker-track">
        <div v-for="sponsor in sponsors" :key="sponsor.id" class="ticker-item">{{ sponsor.name }}</div>
        <div v-for="sponsor in sponsors" :key="`${sponsor.id}-clone`" class="ticker-item">{{ sponsor.name }}</div>
      </div>
    </div>

      <div class="sponsors-list">
        <div v-for="sponsor in sponsors" :key="sponsor.id" class="sponsor-item mb-5">

          <div v-if="sponsor.tier === 'Gold'" class="sponsor-tier-gold">
            <h2 class="tier-title tier-title-gold text-center"><span>🥇</span> Patrocinador de oro</h2>
            <div class="row align-items-center g-5">
              <div class="col-lg-7">
                <img :src="sponsor.image" :alt="sponsor.name" class="img-fluid rounded shadow-lg">
              </div>
              <div class="col-lg-5">
                <h3 class="display-5 fw-bold">{{ sponsor.name }}</h3>
                <p class="lead fst-italic text-muted">{{ sponsor.tagline }}</p>
                <p>{{ sponsor.description }}</p>
                <p><i class="bi bi-link-45deg"></i>{{ sponsor.website }}</p>
                <p>Email: {{ sponsor.email }}</p>
                <p>Phone Number: {{ sponsor.phonenumber }}</p>
                <p class="fw-bold mb-0">Location:</p>
                <p>{{ sponsor.address }}<br/>{{ sponsor.location }}</p>
              </div>
            </div>
          </div>

          <div v-else-if="sponsor.tier === 'Silver'" class="sponsor-tier-silver card shadow-sm mx-auto">
            <h2 class="tier-title tier-title-silver text-center"><span>🥈</span>Patrocinador Plata</h2>
             <div class="row g-0">
               <div class="col-md-5">
                  <img :src="sponsor.image" :alt="sponsor.name" class="img-fluid rounded-start h-100 object-fit-cover">
               </div>
               <div class="col-md-7">
                  <div class="card-body p-4">
                    <h4 class="card-title-silver fw-bold">{{ sponsor.name }}</h4>
                    <p class="card-text"><small class="text-muted">{{ sponsor.address }}, {{ sponsor.location }}</small></p>
                    <p class="card-text mt-3">{{ sponsor.description }}</p>
                  </div>
               </div>
             </div>
          </div>

          <div v-else class="sponsor-tier-bronze">
            <p class="d-inline-block"><span>🥉</span></p>
            <h5 class="fw-bold d-inline-block me-3">{{ sponsor.name }}</h5>
            <span class="text-muted">{{ sponsor.location }}</span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>