<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {getApiUrl} from "@/utils.js";

const router = useRouter();

const firstName = ref("");
const lastName = ref("");
const email = ref("");

const register = async () => {
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

  try {
    const response = await fetch(`${getApiUrl()}/user/registration`, request);
    if (!response.ok) {
      alert("Error registering new user. Please try again!");
      return;
    }
    const result = await response.json();
    console.log("User registered: ", result);
    alert("Registration successful!");

    await router.push({name: "login"});
  } catch (error) {
    console.error(error);
    alert("Registration failed.");
  }
};

const goToLoginPage = () => {
  router.push({name: "login"})
}
</script>

<template>
  <div class="mb-3">
    <label for="firstName" class="form-label">First Name</label>
    <input type="text" class="form-control" id="firstName" v-model="firstName"/>

    <label for="lastName" class="form-label">Last Name</label>
    <input type="text" class="form-control" id="lastName" v-model="lastName"/>

    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" v-model="email"/>

    <button class="btn btn-primary mt-3" @click="register">Register</button>
    <button class="btn btn-outline-secondary mt-3" @click="goToLoginPage">Log in</button>
  </div>
</template>
