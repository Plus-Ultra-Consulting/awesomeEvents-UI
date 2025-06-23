<script setup>
import {ref, onMounted} from "vue";
import {getApiUrl, showModalWhenReady} from "@/utils.js";
import {useRouter} from "vue-router";

const router = useRouter();

const user = ref({
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  createdAt: "",
  role: "",
});

const loadUser = async () => {
  const request = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("auth.accessToken")}`,
    },
  };
  const response = await fetch(`${getApiUrl()}/user`, request);
  const data = await response.json();
  console.log(data);
  user.value = data;
};

const updateUser = async () => {
  const payload = {
    firstName: user.value.firstName,
    lastName: user.value.lastName,
    email: user.value.email,
  };

  const request = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("auth.accessToken")}`,
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${getApiUrl()}/user`, request);
  if (!response.ok) {
    showModalWhenReady("userUpdateFailedFailedModal");
    return;
  }
  const result = await response.json();
  console.log("User updated: ", result);
  showModalWhenReady("userUpdateSuccessfulModal");
};

const deleteUser = async () => {
  const request = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("auth.accessToken")}`,
    }
  };

  const response = await fetch(`${getApiUrl()}/user`, request);
  if (!response.ok) {
    showModalWhenReady("userDeleteFailedFailedModal");
    return;
  }
  const result = await response.json();
  console.log("User deleted: ", result);
  showModalWhenReady("userDeleteSuccessfulModal");

  localStorage.setItem("auth.accessToken", "");
  await router.push({name: "login"});
};

onMounted(loadUser);
</script>

<template>
  <h5>Profile:</h5>
  <div class="mb-3">
    <label for="userId" class="form-label">ID</label>
    <input type="text" class="form-control" id="userId" :value="user.id" disabled/>

    <label for="firstName" class="form-label">First name</label>
    <input type="text" class="form-control" id="firstName" v-model="user.firstName"/>

    <label for="lastName" class="form-label">Last name</label>
    <input type="text" class="form-control" id="lastName" v-model="user.lastName"/>

    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" v-model="user.email"/>

    <label for="createdAt" class="form-label">Created at</label>
    <input type="text" class="form-control" id="createdAt" :value="user.createdAt" disabled/>

    <label for="role" class="form-label">Role</label>
    <input type="text" class="form-control" id="role" :value="user.role" disabled/>

    <button class="btn btn-primary mt-3" @click="updateUser">Update</button>
    <button class="btn btn-danger mt-3" @click="deleteUser">Delete</button>
  </div>

  <div class="modal fade" id="userUpdateSuccessfulModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Successfully updated the user !</h1>
        </div>
        <div class="modal-body">
          Successfully updated the user.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="userUpdateFailedFailedModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Failed to update the user !</h1>
        </div>
        <div class="modal-body">
          Failed to update the user. Please try again.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="userDeleteSuccessfulModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Successfully deleted the user !</h1>
        </div>
        <div class="modal-body">
          Successfully deleted the user.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="userDeleteFailedFailedModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Failed to delete the user !</h1>
        </div>
        <div class="modal-body">
          Failed to delete the user. Please try again.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
