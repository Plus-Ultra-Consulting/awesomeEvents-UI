<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getApiUrl} from "@/utils.js";

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
    alert("Failed to update person.");
    return;
  }
  const result = await response.json();
  console.log("Person updated: ", result);
  alert("Person updated successfully!");
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

const sendEmailToPerson = () => {
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
  const response = fetch(`${getApiUrl()}/person/sendSecurityCode`, request);
  if (!response.ok) {
    alert("Failed to send email.");
    return;
  }

  alert("Email sent successfully!");
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

    <label for="startAt" class="form-label">Email</label>
    <input type="text" class="form-control" id="startAt" v-model="person.email"/>

    <label for="createdAt" class="form-label">Created at</label>
    <input type="text" class="form-control" id="createdAt" :value="person.createdAt" disabled/>

    <label for="securityCode" class="form-label">Security code</label>
    <input type="text" class="form-control" id="securityCode" :value="person.securityCode"
           disabled/>

    <div v-if="person.securityCodeActivatedAt === null">Security code wasn't used</div>
    <div v-else class="bg-warning">Security code was used {{ person.securityCodeActivatedAt }}</div>

    <button class="btn btn-primary mt-3" @click="updatePerson">Update</button>
    <button class="btn btn-danger mt-3" @click="deletePerson">Delete</button>
    <button class="btn btn-success mt-3 bi bi-envelope-arrow-up" @click="sendEmailToPerson"> Send
      email
    </button>
    <button class="btn btn-secondary mt-3" @click="goToPersonEventPage">Go back</button>
  </div>
</template>
