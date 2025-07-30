<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getApiUrl} from "@/utils.js";

const router = useRouter();
const eventId = router.currentRoute.value.params.eventId;
const securityCode = router.currentRoute.value.params.personSecurityCode;

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
  const response = await fetch(`${getApiUrl()}/person/${eventId}/securityCode/${securityCode}`, request);
  const data = await response.json();
  console.log(data);
  person.value = data;
};

const goToPersonEventPage = async () => {
  await router.push({name: "oneEvent", params: {id: eventId}});
}

const activateCode = async () => {
  const request = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("auth.accessToken")}`,
    },
    method: "POST",
    body: JSON.stringify({
      securityCode: person.value.securityCode
    }),
  };
  const response = await fetch(`${getApiUrl()}/person/useSecurityCode`, request);
  if (response.ok) {
    router.go();
  }
  const data = await response.json();
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
    <input type="text" class="form-control" id="name" v-model="person.firstName" disabled/>

    <label for="place" class="form-label">Last name</label>
    <input type="text" class="form-control" id="place" v-model="person.lastName" disabled/>

    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" v-model="person.email" disabled/>

    <label for="createdAt" class="form-label">Created at</label>
    <input type="text" class="form-control" id="createdAt" :value="person.createdAt" disabled/>

    <label for="securityCode" class="form-label">Security code</label>
    <input type="text" class="form-control" id="securityCode" :value="person.securityCode"
           disabled/>

    <div v-if="person.securityCodeActivatedAt === null">Security code wasn't used <br>
      <button class="btn btn-primary mt-3" @click="activateCode">Activate</button>
    </div>
    <div v-else class="bg-warning">Security code was used {{ person.securityCodeActivatedAt }}</div>
    <button class="btn btn-secondary mt-3" @click="goToPersonEventPage">Go back</button>
  </div>
</template>
