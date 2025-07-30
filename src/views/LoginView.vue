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
  <div class="container mt-5" style="max-width: 400px;">
    <h2>Awesome Events</h2>
    <form>
      <div class="mb-3">
        <input type="email" class="form-control" placeholder="Email address" v-model="username"/>
      </div>

      <div v-if="otpSent">
        <div class="mb-3">
          <input type="text" class="form-control" placeholder="One-time code" v-model="otp" maxlength="6"/>
        </div>
        <button class="btn btn-primary w-100" type="button" @click="login">Sign In</button>
      </div>

      <div v-else>
        <button class="btn btn-primary w-100" type="button" @click="sendOtp" data-bs-toggle="modal" data-bs-target="#emailSendingInProgressModal">Send One-time code</button>
      </div>

      <div class="text-center mt-3">
        <small>Not a member?
          <a href="#" @click="goToRegistrationPage">Sign Up</a>
        </small>
      </div>
    </form>
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
          The code has been sent, please check your email.
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
