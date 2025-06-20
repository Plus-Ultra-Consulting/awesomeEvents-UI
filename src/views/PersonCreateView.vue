<script setup>
import {ref} from "vue";
import {getApiUrl} from "@/utils.js";
import {useRouter} from "vue-router";

const router = useRouter();

const id = router.currentRoute.value.params.id;
const firstName = ref("john");
const lastName = ref("doe");
const email = ref("john@example.com");

const createPerson = async () => {
  const body = JSON.stringify({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    eventId: id,
  });

  const request = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("auth.accessToken")}`,
    },
    method: "POST",
    body,
  };

  const response = await fetch(`${getApiUrl()}/person`, request);
  if (!response.ok) {
    alert("Error creating new person. Please try again!");
    return;
  }
  const result = await response.json();
  console.log("Person created: ", result);
  alert("Person created successfully!");
  await router.push({name: "oneEvent", params: {id: id.toString()}});
};
</script>
<template>
  <h5>Create new event</h5>

  <div class="mb-3">
    <label for="firstName" class="form-label">name</label>
    <input type="text" class="form-control" id="firstName" v-model="firstName"/>

    <label for="lastName" class="form-label">place</label>
    <input type="text" class="form-control" id="lastName" v-model="lastName"/>

    <label for="email" class="form-label">starts at</label>
    <input type="email" class="form-control" id="email" v-model="email"/>

    <button class="btn btn-primary mt-3" @click="createPerson">Create</button>
  </div>
</template>
