<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import { useStore } from "vuex";
import { key } from "./types/Store";
const router = useRouter();
const store = useStore(key);

router.beforeResolve(async (to) => {
  console.info(to);
  if (to.query.page) {
    await store.dispatch({ type: "goTo", page: to.query.page });
  } else {
    await store.dispatch({ type: "init" });
  }
});
</script>

<template>
  <RouterView />
</template>

<style src="@/style/app.scss" lang="scss"></style>
