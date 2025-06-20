<script setup>
import {ref, onMounted} from "vue";
import {getApiUrl} from "@/utils.js";
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
    alert("Failed to update user.");
    return;
  }
  const result = await response.json();
  console.log("User updated: ", result);
  alert("User updated successfully!");
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
    alert("Failed to delete user.");
    return;
  }
  const result = await response.json();
  console.log("User deleted: ", result);
  alert("User deleted successfully!");

  localStorage.setItem("auth.accessToken", "");
  router.push({name: "login"});
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
</template>
