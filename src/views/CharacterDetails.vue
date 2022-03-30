<script setup lang="ts">
import type Character from "@/types/Character";
import { key } from "@/types/Store";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { laAngleLeftSolid } from "@quasar/extras/line-awesome";
import { onMounted, ref, type Ref } from "vue";
const store = useStore(key);
const router = useRouter();
const route = useRoute();
const char: Ref<Character | undefined> = ref();
const clickHandler = () => {
  router.back();
};

const eps = ref();
const isLoading = ref(true);
onMounted(async () => {
  await store.dispatch({ type: "getCharacterById", id: route.params.id });
  char.value = store.state.selectedCharacter;
  const ids = char.value?.episode.reduce(
    (prev: string, curr: string, i: number) =>
      (prev += `${curr.substring(curr.lastIndexOf("/") + 1, curr.length)}${
        char.value && i < char.value.episode.length - 1 ? "," : ""
      }`),
    ""
  );
  const list = await (
    await fetch(`https://rickandmortyapi.com/api/episode/${ids}`)
  ).json();
  eps.value = list instanceof Array ? list : [list];
  isLoading.value = false;
});
</script>
<template>
  <div v-if="isLoading" class="row flex-center">
    <q-spinner color="secondary" size="5em" />
  </div>
  <div v-else class="row" style="max-height: 100vh">
    <div class="col full-height q-mt-lg">
      <div class="row flex-center q-mb-md">
        <div class="text-h3">{{ char?.name }}</div>
      </div>
      <div class="row flex-center scroll">
        <div class="column col-4 flex-center">
          <q-img
            :src="char?.image"
            class="rounded-borders"
            fit="scale-down"
            :alt="char?.name"
          />
        </div>
        <div class="column col-4">
          <q-list dark>
            <q-item>
              <q-item-section>
                <q-item-label overline>Status</q-item-label>
                <q-item-label class="text-capitalize">{{
                  char?.status
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label overline>Species</q-item-label>
                <q-item-label>{{ char?.species }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="char?.type">
              <q-item-section>
                <q-item-label overline>Type</q-item-label>
                <q-item-label>{{ char?.type }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label overline>Gender</q-item-label>
                <q-item-label>{{ char?.gender }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label overline>Origin</q-item-label>
                <q-item-label>{{ char?.origin.name }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label overline>Location</q-item-label>
                <q-item-label>{{
                  char?.location ? char?.location.name : "Unknown"
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label overline>
                  Episodes ({{ char?.episode.length }})
                </q-item-label>
                <q-item-label>
                  <q-scroll-area
                    v-if="eps.length >= 5"
                    dark
                    visible
                    style="height: 10vh"
                  >
                    <div class="row" v-for="ep in eps" v-bind:key="ep.id">
                      {{ ep.episode }} - {{ ep.name }}
                    </div>
                  </q-scroll-area>
                  <div v-else>
                    <div class="row" v-for="ep in eps" v-bind:key="ep.id">
                      {{ ep.episode }} - {{ ep.name }}
                    </div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <div class="row flex-center q-mt-md">
        <q-btn
          :icon="laAngleLeftSolid"
          v-on:click="clickHandler"
          label="Back to the list"
          rounded
          color="secondary"
        />
      </div>
    </div>
  </div>
</template>
