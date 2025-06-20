<script setup>
import {ref} from "vue";
import {getApiUrl} from "@/utils.js";
import {useRouter} from "vue-router";

const router = useRouter();

const name = ref("name");
const place = ref("fun place");
const startAt = ref("2025-12-22 23:30");

const createEvent = async () => {
  const body = JSON.stringify({
    name: name.value,
    place: place.value,
    startAt: startAt.value,
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
    alert("Error creating new event. Please try again!");
    return;
  }
  const result = await response.json();
  console.log("Event created: ", result);
  alert("Event created successfully!");
  await router.push({name: "event"});
};
</script>
<template>
  <h5>Create new event</h5>

  <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control" id="name" v-model="name"/>

    <label for="place" class="form-label">Place</label>
    <input type="text" class="form-control" id="place" v-model="place"/>

    <label for="startAt" class="form-label">Starts at</label>
    <input type="text" class="form-control" id="startAt" v-model="startAt"/>

    <button class="btn btn-primary mt-3" @click="createEvent">Create</button>
  </div>
</template>
