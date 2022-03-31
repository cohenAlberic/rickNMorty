<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { key } from "../types/Store";
import CharacterCard from "./CharacterCard.vue";
import {
  laAngleLeftSolid,
  laAngleRightSolid,
  laSearchengin,
  laAngleDoubleLeftSolid,
  laAngleDoubleRightSolid,
} from "@quasar/extras/line-awesome";

const route = useRoute();
const store = useStore(key);

const current = ref(0);

watch(
  () => route.query,
  () => {
    if (route.query.page) {
      isLoading.value = true;
      current.value = parseInt(route.query.page as string);
      store
        .dispatch({ type: "goTo", page: current.value })
        .then(() => (isLoading.value = false));
    }
  }
);

const query = ref("");
const dead = ref(true);
const alive = ref(true);
const unknown = ref(true);
const isLoading = ref(true);
const searchHandler = () => {
  store.dispatch({
    type: "search",
    query: query.value,
    dead: dead.value,
    alive: alive.value,
    unknown: unknown.value,
  });
};

const pageHandler = (page: number) => {
  return { name: "characters", query: { page } };
};

onMounted(async () => {
  await store.dispatch({ type: "goTo", page: route.query.page ?? 1 });
  current.value = parseInt((route.query.page as string) ?? 1);
  isLoading.value = false;
});
</script>
<template>
  <div v-if="isLoading" class="row flex-center">
    <q-spinner color="secondary" size="5em" />
  </div>
  <div v-else class="col items-center">
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
              label="Name"
              class="searchInput"
            />
          </div>
          <div class="col-2">
            <div class="row">
              <q-checkbox v-model="alive" label="Alive" color="secondary" />
            </div>
            <div class="row">
              <q-checkbox v-model="dead" label="Dead" color="secondary" />
            </div>
            <div class="row">
              <q-checkbox v-model="unknown" label="Unknown" color="secondary" />
            </div>
          </div>
          <div class="col-2 items-center justify-center">
            <q-btn
              round
              color="secondary"
              :icon="laSearchengin"
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
        <router-link :to="{ name: 'details', params: { id: item.id } }">
          <CharacterCard :char="item" />
        </router-link>
      </div>
    </div>
    <div class="row flex-center q-mt-md q-mb-md">
      <q-pagination
        :model-value="current"
        :max="store.state.pages"
        :max-pages="6"
        boundary-numbers
        color="secondary"
        direction-links
        boundary-links
        :icon-next="laAngleRightSolid"
        :icon-prev="laAngleLeftSolid"
        :icon-first="laAngleDoubleLeftSolid"
        :icon-last="laAngleDoubleRightSolid"
        :to-fn="pageHandler"
        push
      />
    </div>
  </div>
</template>
<style src="@/style/listView.scss" scoped lang="scss"></style>
