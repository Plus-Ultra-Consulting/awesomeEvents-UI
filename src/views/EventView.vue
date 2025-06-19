<script setup>
import {ref, onMounted} from "vue";
import dayjs from "dayjs";

const events = ref([]);

const loadEvents = async () => {
  const request = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("auth.accessToken")}`,
    },
  };
  const response = await fetch("http://localhost:8080/event", request);
  const data = await response.json();
  console.log(data);
  events.value = data.events;
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
  </div>
  <div class="row" v-for="event of events">
    <div class="col">
      {{ event.name }}
    </div>
    <div class="col">
      {{ event.place }}
    </div>
    <div class="col">
      {{ dayjs(event.startAt).format("YYYY/MM/DD HH:mm") }}
    </div>
  </div>
</template>
