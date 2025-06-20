<script setup>
import {ref, onMounted} from "vue";
import dayjs from "dayjs";
import {getApiUrl} from "@/utils.js";
import {useRouter} from "vue-router";

const events = ref([]);
const router = useRouter();

const loadEvents = async () => {
  const request = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("auth.accessToken")}`,
    },
  };
  const response = await fetch(`${getApiUrl()}/event`, request);
  const data = await response.json();
  console.log(data);
  events.value = data.events;
}

const goToCreateEventPage = () => {
  router.push({name: "createEvent"});
}

const goToEventPage = (id) => {
  router.push({name: "oneEvent", params: {id: String(id)}});
}

const deleteEvent = async (id) => {
  const request = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("auth.accessToken")}`,
    },
    method: "DELETE",
    body: JSON.stringify({
      id: id,
    }),
  };
  const response = await fetch(`${getApiUrl()}/event`, request);
  if (response.ok) {
    router.go();
  }
  const data = await response.json();
  console.log(data);
}

onMounted(loadEvents);
</script>
<template>
  <h5>List of events</h5>
  <div class="row">
    <div class="col">
      Name
    </div>
    <div class="col">
      Place
    </div>
    <div class="col">
      Starts At
    </div>
    <div class="col">
    </div>
  </div>
  <div class="row" v-for="event of events">
    <a href="#" class="col link-dark" @click="goToEventPage(event.id)">
      {{ event.name }}
    </a>
    <div class="col">
      {{ event.place }}
    </div>
    <div class="col">
      {{ dayjs(event.startAt).format("YYYY/MM/DD HH:mm") }}
    </div>
    <div class="col">
      <button class="btn btn-danger bi bi-trash" @click="deleteEvent(event.id)"></button>
    </div>
  </div>

  <button class="btn btn-outline-primary mt-3" @click="goToCreateEventPage">Create new</button>
</template>
