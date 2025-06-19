<script setup>
import {ref, onMounted} from "vue";

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
  const response = await fetch("http://localhost:8080/user", request);
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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("auth.accessToken")}`,
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch("http://localhost:8080/user/edit", request);
    if (!response.ok) {
      return;
    }
    const result = await response.json();
    console.log("User updated: ", result);
    alert("User updated successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to update user.");
  }
};

onMounted(loadUser);
</script>

<template>
  <h5>Profile:</h5>
  <div class="mb-3">
    <label for="userId" class="form-label">ID</label>
    <input type="text" class="form-control" id="userId" :value="user.id" disabled/>

    <label for="firstName" class="form-label">First Name</label>
    <input type="text" class="form-control" id="firstName" v-model="user.firstName"/>

    <label for="lastName" class="form-label">Last Name</label>
    <input type="text" class="form-control" id="lastName" v-model="user.lastName"/>

    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" v-model="user.email"/>

    <label for="createdAt" class="form-label">Created At</label>
    <input type="text" class="form-control" id="createdAt" :value="user.createdAt" disabled/>

    <label for="role" class="form-label">Role</label>
    <input type="text" class="form-control" id="role" :value="user.role" disabled/>

    <button class="btn btn-primary mt-3" @click="updateUser">Update</button>
  </div>
</template>
