<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

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
    alert("BOOM!");
    return;
  }

  const result = await response.json();

  localStorage.setItem("auth.accessToken", result.access_token);
  router.push({ name: "home" });
};
</script>
<template>
  <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" v-model="username">
  <button class="btn btn-primary" @click="login">Login</button>
</div>
</template>
