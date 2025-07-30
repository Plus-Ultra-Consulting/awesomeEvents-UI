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

  <div class="container mt-5" style="max-width: 400px;">
    <h2>Awesome Events</h2>
    <form>
      <input type="text" class="form-control mb-3" placeholder="First name" v-model="firstName"/>
      <input type="text" class="form-control mb-3" placeholder="Last name" v-model="lastName"/>
      <input type="email" class="form-control mb-3" placeholder="Email address" v-model="email"/>

      <button class="btn btn-primary  w-100" type="button" @click="register">Sign Up</button>

      <div class="text-center mt-3">
        <small>Already have an account?
          <a href="#" @click="goToLoginPage">Sign In</a>
        </small>
      </div>
    </form>
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
          Failed to register an account.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
