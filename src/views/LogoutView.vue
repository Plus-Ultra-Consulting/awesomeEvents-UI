<script setup>
import {useRouter} from "vue-router";

const router = useRouter();

localStorage.setItem("auth.accessToken", "");
router.push({name: "login"});
</script>
<template>
</template>
