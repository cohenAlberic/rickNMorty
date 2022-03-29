<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { key } from "../types/Store";
import CharacterCard from "./CharacterCard.vue";
const router = useRouter();
const route = useRoute();
const store = useStore(key);
const current = ref(
  route.query.page ? parseInt(route.query.page.toString()) : 1
);
//current.value = route.query.page ? parseInt(route.query.page.toString()) : 1;
const query = ref("");
const dead = ref(true);
const alive = ref(true);
const unknown = ref(true);

const searchHandler = () => {
  store.dispatch({
    type: "search",
    query: query.value,
    dead: dead.value,
    alive: alive.value,
    unknown: unknown.value,
  });
};

const clickHandler = (id: number) => {
  router.push({ name: "details", params: { id } });
};

const pageHandler = (page: number) => {
  return { path: "/characters", query: { page } };
};
</script>
<template>
  <div class="col items-center">
    <div class="row justify-center logo">
      <img src="@/assets/logo.png" alt="logo" />
    </div>
    <div class="row q-gutter-md searchbar justify-center">
      <div class="col-6">
        <div class="row items-center justify-evenly">
          <div class="col-4 items-center">
            <q-input
              bg-color="white"
              color="secondary"
              label-color="secondary"
              outlined
              v-model="query"
              label="Nom"
              class="searchInput"
            />
          </div>
          <div class="col-2">
            <div class="row">
              <q-checkbox v-model="alive" label="Vivant" color="secondary" />
            </div>
            <div class="row">
              <q-checkbox v-model="dead" label="Mort" color="secondary" />
            </div>
            <div class="row">
              <q-checkbox v-model="unknown" label="Inconnu" color="secondary" />
            </div>
          </div>
          <div class="col-2 items-center justify-center">
            <q-btn
              round
              color="secondary"
              icon="fa-brands fa-searchengin"
              v-on:click="searchHandler"
              class="button"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row q-gutter-md justify-center">
      <div
        class="col-6 col-sm-2"
        v-for="item in store.state.list"
        v-bind:key="item.id"
      >
        <CharacterCard :char="item" v-on:click="() => clickHandler(item.id)" />
      </div>
    </div>
    <div class="row flex-center">
      <q-pagination
        :model-value="current"
        :max="store.state.pages"
        :max-pages="6"
        boundary-numbers
        color="secondary"
        direction-links
        icon-next="fa-solid fa-angles-right"
        icon-prev="fa-solid fa-angles-left"
        :to-fn="pageHandler"
      />
    </div>
  </div>
</template>
<style src="@/style/listView.scss" scoped lang="scss"></style>
