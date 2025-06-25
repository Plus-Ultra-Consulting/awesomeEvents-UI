<script setup>
import {ref} from "vue";
import {getApiUrl, showModalWhenReady} from "@/utils.js";
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
    showModalWhenReady("eventCreateFailedModal");
    return;
  }
  const result = await response.json();
  console.log("Person created: ", result);
  await router.push({name: "oneEvent", params: {id: id.toString()}});
};
</script>
<template>
  <h5>Create new event</h5>

  <div class="mb-3">
    <label for="firstName" class="form-label">Name</label>
    <input type="text" class="form-control" id="firstName" v-model="firstName"/>

    <label for="lastName" class="form-label">Place</label>
    <input type="text" class="form-control" id="lastName" v-model="lastName"/>

    <label for="email" class="form-label">Starts at</label>
    <input type="email" class="form-control" id="email" v-model="email"/>

    <button class="btn btn-primary mt-3" @click="createPerson">Create</button>
  </div>

  <div class="modal fade" id="eventCreateFailedModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Failed to create a person !</h1>
        </div>
        <div class="modal-body">
          Failed to create a person. Please try again.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
