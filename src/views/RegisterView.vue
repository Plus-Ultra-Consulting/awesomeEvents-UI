<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {getApiUrl, showModalWhenReady} from "@/utils.js";

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

  const response = await fetch(`${getApiUrl()}/user/registration`, request);
  if (!response.ok) {
    showModalWhenReady('registrationFailedModal');
    return;
  }
  const result = await response.json();
  console.log("User registered: ", result);

  showModalWhenReady('registeredSuccessfullyModal');
};

const goToLoginPage = () => {
  router.push({name: "login"})
}
</script>

<template>
  <div class="mb-3">
    <label for="firstName" class="form-label">First name</label>
    <input type="text" class="form-control" id="firstName" v-model="firstName"/>

    <label for="lastName" class="form-label">Last name</label>
    <input type="text" class="form-control" id="lastName" v-model="lastName"/>

    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" v-model="email"/>

    <button class="btn btn-primary mt-3" @click="register">Register</button>
    <button class="btn btn-outline-secondary mt-3" @click="goToLoginPage">Log in</button>
  </div>

  <div class="modal fade" id="registeredSuccessfullyModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Registration Successful !</h1>
        </div>
        <div class="modal-body">
          Your account has been registered. You can now login.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="goToLoginPage">Login</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="registrationFailedModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Registration Failed !</h1>
        </div>
        <div class="modal-body">
          Failed to send register an account. Please try again.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
