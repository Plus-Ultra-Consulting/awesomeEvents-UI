<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const username = ref();

const login = async () => {
  const body = JSON.stringify({
    username: username.value,
  });
  const request = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body,
  };
  const response = await fetch("http://localhost:8080/user/login", request);
  if (!response.ok) {
    alert("Error logging in. Please try again!");
    return;
  }

  const result = await response.json();

  localStorage.setItem("auth.accessToken", result.access_token);
  await router.push({name: "home"});
};

const goToRegistrationPage = () => {
  router.push({name: "register"})
}

</script>
<template>
  <div class="mb-3">
    <label for="username" class="form-label">Email address</label>
    <input type="email" class="form-control" id="username" v-model="username">

    <button class="btn btn-primary mt-3" @click="login">Login</button>
    <button class="btn btn-outline-secondary mt-3" @click="goToRegistrationPage">Register</button>
  </div>
</template>
