<script setup>
import {onMounted, ref} from 'vue'
import {getApiUrl} from "@/utils.js";
import {useRouter} from "vue-router";

const router = useRouter();

const organisations = ref([ // #TODO create orgs
  {name: 'Organisation 1'},
  {name: 'Organisation 2'},
  {name: 'Organisation 3'},
  {name: 'Organisation 4'},
  {name: 'Organisation 5'}
])

const events = ref([])

const devInfo = ref({ // #TODO Think how to do dev info, right now just a place holder
  timeAgo: '10 minutes ago',
  message: 'started selling your data to 3rd parties',
  note: 'no more info.'
})

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

onMounted(loadEvents);
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2 border-end">
        <div class="d-flex justify-content-between align-items-center mt-3 mb-2">
          <h6 class="mb-0">Organisations</h6>
          <button class="btn btn-sm btn-outline-success">New</button>
        </div>

        <input type="text" class="form-control mb-3" placeholder="find an organisation"/>

        <div v-for="(org, index) in organisations" :key="index" class="mb-2">
          <button class="btn w-100 btn-outline-secondary"> {{ org.name }} </button>
        </div>

        <a href="#" class="d-block mt-2">show more</a>
      </div>

      <div class="col-md-7">
        <div class="d-flex justify-content-between align-items-center mt-3 mb-3">
          <h5 class="mb-0">Events</h5>
          <button class="btn btn-sm btn-outline-success" @click="goToCreateEventPage">New</button>
        </div>

        <div v-for="(event, i) in events" :key="i" class="card mb-3">
          <div class="card-body" @click="goToEventPage(event.id)">
            <h6 class="card-title">
              <strong> {{ event.name }} </strong>
              <small class="float-end text-muted">created by <strong>placeholder name</strong></small>
            </h6>
            <p><strong>place:</strong> {{ event.place }}</p>
            <p>{{ event.description }}</p>
            <p><strong>starts at:</strong> {{ event.startAt }}</p>
          </div>
        </div>

        <div v-if="events.length === 0">
          <h4>No events found</h4>
        </div>

      </div>

      <div class="col-md-3 mt-3">
        <div class="card">
          <div class="card-header"> Dev info </div>
          <div class="card-body">
            <p class="mb-1 text-muted"><small>{{ devInfo.timeAgo }}</small></p>
            <p class="mb-1">{{ devInfo.message }}</p>
            <p class="text-muted"><small>{{ devInfo.note }}</small></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
