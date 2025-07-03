<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getApiUrl, showModalWhenReady} from "@/utils.js";
import { Modal } from "bootstrap";

const router = useRouter();
const eventId = router.currentRoute.value.params.eventId;
const personId = router.currentRoute.value.params.personId;

const person = ref({
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  createdAt: "",
  securityCode: "",
  securityCodeActivatedAt: "",
});

const loadPerson = async () => {
  const request = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("auth.accessToken")}`,
    },
    method: "GET",
  };
  const response = await fetch(`${getApiUrl()}/person/${eventId}/${personId}`, request);
  const data = await response.json();
  console.log(data);
  person.value = data;
};

const updatePerson = async () => {
  const body = {
    id: person.value.id,
    firstName: person.value.firstName,
    lastName: person.value.lastName,
    email: person.value.email,
  };

  const request = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("auth.accessToken")}`,
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(`${getApiUrl()}/person`, request);
  if (!response.ok) {
    showModalWhenReady("personUpdateFailedFailedModal");
    return;
  }
  const result = await response.json();
  console.log("Person updated: ", result);
  showModalWhenReady("personUpdateSuccessfulModal");

  await loadPerson();
};

const deletePerson = async () => {
  const request = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("auth.accessToken")}`,
    },
    method: "DELETE",
    body: JSON.stringify({
      id: personId
    }),
  };
  const response = await fetch(`${getApiUrl()}/person`, request);
  if (response.ok) {
    await router.push({name: "oneEvent", params: {id: eventId}});
  }
  const data = await response.json();
  console.log(data);
}

const goToPersonEventPage = async () => {
  await router.push({name: "oneEvent", params: {id: eventId}});
}

const sendEmailToPerson = async () => {
  const body = {
    id: personId
  };
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("auth.accessToken")}`,
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${getApiUrl()}/person/sendSecurityCode`, request);
  if (!response.ok) {
    showModalWhenReady('emailSentFailedModal');
    return;
  }

  const modalElementInProgress = document.getElementById('emailSendingInProgressModal');
  const modalInProgress = Modal.getInstance(modalElementInProgress) || new Modal(modalElementInProgress);
  modalInProgress.hide();

  showModalWhenReady('emailSentSuccessfullyModal');

  const data = response.json();
  console.log(data);
}

onMounted(loadPerson)
</script>

<template>
  <h5>Person:</h5>
  <div class="mb-3">
    <label for="id" class="form-label">ID</label>
    <input type="text" class="form-control" id="id" :value="person.id" disabled/>

    <label for="name" class="form-label">First name</label>
    <input type="text" class="form-control" id="name" v-model="person.firstName"/>

    <label for="place" class="form-label">Last name</label>
    <input type="text" class="form-control" id="place" v-model="person.lastName"/>

    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" v-model="person.email"/>

    <label for="createdAt" class="form-label">Created at</label>
    <input type="text" class="form-control" id="createdAt" :value="person.createdAt" disabled/>

    <label for="securityCode" class="form-label">Security code</label>
    <input type="text" class="form-control" id="securityCode" :value="person.securityCode"
           disabled/>

    <div v-if="person.securityCodeActivatedAt === null">Security code wasn't used</div>
    <div v-else class="bg-warning">Security code was used {{ person.securityCodeActivatedAt }}</div>

    <button class="btn btn-primary mt-3" @click="updatePerson">Update</button>
    <button class="btn btn-danger mt-3" @click="deletePerson">Delete</button>
    <button class="btn btn-success mt-3 bi bi-envelope-arrow-up" type="button" data-bs-toggle="modal" data-bs-target="#emailSendingInProgressModal" @click="sendEmailToPerson"> Send
      email
    </button>
    <button class="btn btn-secondary mt-3" @click="goToPersonEventPage">Go back</button>
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

  <div class="modal fade" id="personUpdateSuccessfulModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Successfully updated a person !</h1>
        </div>
        <div class="modal-body">
          Successfully updated a person.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="personUpdateFailedFailedModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Failed to update a person !</h1>
        </div>
        <div class="modal-body">
          Failed to update a person.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
