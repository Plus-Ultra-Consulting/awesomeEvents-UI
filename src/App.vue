<script setup>
import {RouterLink, RouterView, useRoute} from "vue-router"

const route = useRoute();
const hideNavbar = ["login", "register"]
</script>

<template>
  <div>
    <nav v-if="!hideNavbar.includes(route.name)" class="navbar navbar-expand-lg bg-dark-subtle">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link" aria-current="page">
                <i class="bi bi-grid me-1"></i>Dashboard
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/event" class="nav-link" aria-current="page">
                Events
              </RouterLink>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink to="/user" class="nav-link" aria-current="page">
                <i class="bi bi-person-circle me-1"> </i> Profile
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/logout" class="nav-link" aria-current="page">
                <i class="bi bi-box-arrow-right me-1"></i>Logout
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <RouterView/>

</template>
