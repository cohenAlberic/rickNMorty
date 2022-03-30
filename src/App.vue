<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="row justify-center logo">
    <img src="@/assets/logo.png" alt="logo" />
  </div>
  <RouterView />
</template>

<style src="@/style/app.scss" lang="scss"></style>
