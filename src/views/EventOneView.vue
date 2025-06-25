<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getApiUrl, showModalWhenReady} from "@/utils.js";
import {Modal} from "bootstrap";

const router = useRouter();
const id = router.currentRoute.value.params.id;

const event = ref({
  id: null,
  name: "",
  place: "",
  startAt: "",
  createdAt: "",
});

const securityCode = ref({
  securityCode: "",
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
    showModalWhenReady("eventUpdateFailedFailedModal");
    return;
  }
  showModalWhenReady("eventUpdateSuccessfulModal");
  const result = await response.json();
  console.log("Event updated: ", result);
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

const sendEmailToPerson = async (personId) => {
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
  const response = await fetch(`${getApiUrl()}/person/sendSecurityCode`, request);
  if (!response.ok) {
    showModalWhenReady("emailSentFailedModal");
    return;
  }

  const modalElementInProgress = document.getElementById("emailSendingInProgressModal");
  const modalInProgress = Modal.getInstance(modalElementInProgress) || new Modal(modalElementInProgress);
  modalInProgress.hide();

  showModalWhenReady("emailSentSuccessfullyModal");

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

const activateCode = async () => {
  const request = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("auth.accessToken")}`,
    },
    method: "POST",
    body: JSON.stringify({
      securityCode: securityCode.value.securityCode
    }),
  };
  const response = await fetch(`${getApiUrl()}/person/useSecurityCode`, request);
  if (response.ok) {
    router.go();
    showModalWhenReady("securityCodeActivateSuccessfulModal");
  } else {
    showModalWhenReady("securityCodeActivateFailedModal");
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

    <label for="createdAt" class="form-label">Created at</label>
    <input type="text" class="form-control" id="createdAt" :value="event.createdAt" disabled/>

    <button class="btn btn-primary mt-3" @click="updateEvent">Update</button>
    <button class="btn btn-danger mt-3" @click="deleteEvent">Delete</button>
  </div>

  <h5>List of people</h5>
  <div class="row">
    <div class="col">
      First name
    </div>
    <div class="col">
      Last name
    </div>
    <div class="col">
      Email
    </div>
    <div class="col">
    </div>
  </div>

  <div class="row" v-for="person of people">
    <a v-if="person.securityCodeActivatedAt === null" href="#" class="col link-dark" @click="goToPersonPage(person.id)">
      {{ person.firstName }}
    </a>
    <a v-else href="#" class="col link-dark bg-success" @click="goToPersonPage(person.id)">
      {{ person.firstName }}
    </a>
    <div class="col">
      {{ person.lastName }}
    </div>
    <div class="col">
      {{ person.email }}
    </div>
    <div class="col">
      <button class="btn btn-success bi bi-envelope-arrow-up" type="button" data-bs-toggle="modal" data-bs-target="#emailSendingInProgressModal" @click="sendEmailToPerson(person.id)"></button>
      <button class="btn btn-danger bi bi-trash" @click="deletePerson(person.id)"></button>
    </div>
  </div>

  <button class="btn btn-outline-primary mt-3" @click="goToPersonCreatePage">Create new</button>

  <div class="mb-3">
    <label for="securityCode" class="form-label">Security code</label>
    <input type="text" class="form-control" id="securityCode" v-model="securityCode.securityCode" maxlength="6" placeholder="XXXXXX"/>

    <button class="btn btn-success mt-3" @click="activateCode">Activate code</button>
  </div>

  <div class="modal fade" id="emailSendingInProgressModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Sending email</h1>
        </div>
        <div class="modal-body">
          Please wait until the email is sent.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">
            <div class="spinner-border text-light spinner-border-sm" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="emailSentSuccessfullyModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Email sent</h1>
        </div>
        <div class="modal-body">
          Email has been sent to the user. Thank you for your patience.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="emailSentFailedModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Failed to send an email !</h1>
        </div>
        <div class="modal-body">
          Failed to send an email. Please try again.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="eventUpdateSuccessfulModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Successfully updated an event !</h1>
        </div>
        <div class="modal-body">
          Successfully updated an event.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="eventUpdateFailedFailedModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Failed to update an event !</h1>
        </div>
        <div class="modal-body">
          Failed to update an event. Please try again.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="securityCodeActivateSuccessfulModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Security code activated !</h1>
        </div>
        <div class="modal-body">
          Security code activated successfully.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="securityCodeActivateFailedModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Failed to activate security code !</h1>
        </div>
        <div class="modal-body">
          Failed to activate security code. Please try again.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
