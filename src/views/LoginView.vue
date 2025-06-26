<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {getApiUrl, showModalWhenReady} from "@/utils.js";
import {Modal} from "bootstrap";

const router = useRouter();

const username = ref();
const otp = ref();
let otpSent = ref(false);

const login = async () => {
  const body = JSON.stringify({
    username: username.value,
    otp: otp.value,
  });
  const request = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body,
  };
  const response = await fetch(`${getApiUrl()}/user/login`, request);
  if (!response.ok) {
    showModalWhenReady("loginFailedModal");
    return;
  }

  const result = await response.json();

  localStorage.setItem("auth.accessToken", result.access_token);
  await router.push({name: "home"});
};

const sendOtp = async () => {

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
  const response = await fetch(`${getApiUrl()}/user/sendOtp`, request);
  if (!response.ok) {
    showModalWhenReady("emailSentFailedModal");
    return;
  }

  const modalElementInProgress = document.getElementById('emailSendingInProgressModal');
  const modalInProgress = Modal.getInstance(modalElementInProgress) || new Modal(modalElementInProgress);
  modalInProgress.hide();

  const result = await response.json();
  console.log(result);
  showModalWhenReady("emailSentSuccessfullyModal");
  otpSent.value = true;
};

const goToRegistrationPage = () => {
  router.push({name: "register"})
}

</script>
<template>
  <div class="mb-3">
    <label for="username" class="form-label">Email</label>
    <input type="email" class="form-control" id="username" v-model="username">

    <div v-if="otpSent === true">
      <label for="otp" class="form-label">One-time code</label>
      <input type="text" class="form-control" id="otp" v-model="otp" placeholder="XXXXXX" maxlength="6">
      <button class="btn btn-primary mt-3" @click="login">Login</button>
    </div>
    <div v-if="otpSent === false">
      <button class="btn btn-primary mt-3" @click="sendOtp" type="button" data-bs-toggle="modal" data-bs-target="#emailSendingInProgressModal">Send one-time password</button>
    </div>
    <button class="btn btn-outline-secondary mt-3" @click="goToRegistrationPage">Register</button>
  </div>

  <div class="modal fade" id="emailSendingInProgressModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Sending email</h1>
        </div>
        <div class="modal-body">
          Please wait until the email is sent.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">
            <div class="spinner-border text-light spinner-border-sm" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="emailSentSuccessfullyModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Email sent</h1>
        </div>
        <div class="modal-body">
          Email has been sent to the user.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="emailSentFailedModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Failed to send an email !</h1>
        </div>
        <div class="modal-body">
          Failed to send an email.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="loginFailedModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Failed to log in !</h1>
        </div>
        <div class="modal-body">
          Failed to log in.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
