<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getApiUrl} from "@/utils.js";

const router = useRouter();
const id = router.currentRoute.value.params.id;

const event = ref({
  id: null,
  name: "",
  place: "",
  startAt: "",
  createdAt: "",
});

const people = ref([]);

const loadEvent = async () => {
  const request = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("auth.accessToken")}`,
    },
    method: "GET",
  };
  const response = await fetch(`${getApiUrl()}/event/${id}`, request);
  const data = await response.json();
  console.log(data);
  event.value = data;
};

const loadPeople = async () => {
  const request = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("auth.accessToken")}`,
    },
    method: "GET",
  };
  const response = await fetch(`${getApiUrl()}/person/${id}/people`, request);
  const data = await response.json();
  console.log(data);
  people.value = data.people;
};

const updateEvent = async () => {
  const payload = {
    id: event.value.id,
    name: event.value.name,
    place: event.value.place,
    startAt: event.value.startAt,
  };

  const request = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("auth.accessToken")}`,
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${getApiUrl()}/event`, request);
  if (!response.ok) {
    alert("Failed to update event.");
    return;
  }
  const result = await response.json();
  console.log("Event updated: ", result);
  alert("Event updated successfully!");
};

const deleteEvent = async () => {
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
    await router.push({name: "event"});
  }
  const data = await response.json();
  console.log(data);
}

const sendEmailToPerson = (email) => {
  const body = {
    email: email,
    subject: "Hello",
    text: "Hello",
  };
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("auth.accessToken")}`,
    },
    body: JSON.stringify(body),
  };
  const response = fetch(`${getApiUrl()}/email`, request);
  if (!response.ok) {
    alert("Failed to send email.");
    return;
  }

  alert("Email sent successfully!");
  const data = response.json();
  console.log(data);
}

const deletePerson = async (personId) => {
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
    router.go();
  }
  const data = await response.json();
  console.log(data);
}

const goToPersonPage = (personId) => {
  router.push({name: "onePerson", params: {eventId: id, personId: personId}});
}

const goToPersonCreatePage = () => {
  router.push({name: "createPerson", params: {id: id}});
}

const loadPage = () => {
  loadEvent()
  loadPeople()
}

onMounted(loadPage)
</script>

<template>
  <h5>Event:</h5>
  <div class="mb-3">
    <label for="id" class="form-label">ID</label>
    <input type="text" class="form-control" id="id" :value="event.id" disabled/>

    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control" id="name" v-model="event.name"/>

    <label for="place" class="form-label">Place</label>
    <input type="text" class="form-control" id="place" v-model="event.place"/>

    <label for="startAt" class="form-label">Starts at</label>
    <input type="text" class="form-control" id="startAt" v-model="event.startAt"/>

    <label for="createdAt" class="form-label">Created At</label>
    <input type="text" class="form-control" id="createdAt" :value="event.createdAt" disabled/>

    <button class="btn btn-primary mt-3" @click="updateEvent">Update</button>
    <button class="btn btn-danger mt-3" @click="deleteEvent">Delete</button>
  </div>

  <h5>List of people</h5>
  <div class="row">
    <div class="col">
      First Name
    </div>
    <div class="col">
      Last Name
    </div>
    <div class="col">
      Email
    </div>
    <div class="col">
    </div>
  </div>

  <div class="row" v-for="person of people">
    <a href="#" class="col link-dark" @click="goToPersonPage(person.id)">
      {{ person.firstName }}
    </a>
    <div class="col">
      {{ person.lastName }}
    </div>
    <div class="col">
      {{ person.email }}
    </div>
    <div class="col">
      <button class="btn btn-success bi bi-envelope-arrow-up" @click="sendEmailToPerson(person.email)"></button>
      <button class="btn btn-danger bi bi-trash" @click="deletePerson(person.id)"></button>
    </div>
  </div>

  <button class="btn btn-outline-primary mt-3" @click="goToPersonCreatePage">Create new</button>
</template>
