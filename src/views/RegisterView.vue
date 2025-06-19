<script setup>
import { ref } from "vue";

const firstName = ref();
const lastName = ref();
const email = ref();

const register = () => {
  const body = JSON.stringify({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
    });
  const request = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body,
  };
  fetch("http://localhost:8080/user/registration", request);
};
</script>
<template>
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">First Name</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" v-model="firstName">
  <label for="exampleFormControlInput1" class="form-label">Last Name</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" v-model="lastName">
  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" v-model="email">
  
  <button class="btn btn-primary" @click="register">Register</button>
</div>
</template>
