<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
<nav class="navbar navbar-expand-lg bg-success-subtle">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/event" class="nav-link" aria-current="page">
              Events
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/logout" class="nav-link" aria-current="page">
              Logout
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    <RouterView />
</template>
