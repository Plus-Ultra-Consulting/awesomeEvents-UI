<script setup>
import {ref} from "vue";
import {getApiUrl, showModalWhenReady} from "@/utils.js";
import {useRouter} from "vue-router";
import dayjs from "dayjs";

const router = useRouter();

const name = ref();
const place = ref();
const startAt = ref();

const createEvent = async () => {
  const body = JSON.stringify({
    name: name.value,
    place: place.value,
    startAt: dayjs(startAt.value).format("YYYY-MM-DD HH:mm"),
  });

  const request = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("auth.accessToken")}`,
    },
    method: "POST",
    body,
  };

  const response = await fetch(`${getApiUrl()}/event`, request);
  if (!response.ok) {
    showModalWhenReady("eventCreateFailedModal");
    return;
  }
  const result = await response.json();
  console.log("Event created: ", result);
  await router.push({name: "home"});
};

const goToHome = async () => {
  await router.push({name: "home"});
};

</script>
<template>
  <div class="container mt-5" style="max-width: 400px;">
    <h2>Create new event</h2>
    <form>
      <input type="text" class="form-control mb-3" placeholder="Name" v-model="name"/>
      <input type="text" class="form-control mb-3" placeholder="Place" v-model="place"/>
      <input type="datetime-local" class="form-control mb-3" placeholder="Choose date" v-model="startAt"/>

      <div class="d-flex justify-content-between">
        <button class="btn btn-secondary w-100" type="button" @click="goToHome">Cancel</button>
        <button class="btn btn-primary w-100" type="button" @click="createEvent">Create</button>
      </div>
    </form>
  </div>

  <div class="modal fade" id="eventCreateFailedModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Failed to create an event !</h1>
        </div>
        <div class="modal-body">
          Failed to create an event.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
