<script setup lang="ts">
import type Character from "@/types/Character";

const prop = defineProps<{ char: Character }>();
</script>

<template>
  <q-card class="card" :flat="false">
    <q-img :src="prop.char.image">
      <div class="absolute-bottom title">
        <p class="absolute-center text-subtitle2 text-center">
          {{ prop.char.name }}
        </p>
      </div>
    </q-img>
  </q-card>
</template>

<style src="@/style/characterCard.scss" lang="scss" scoped></style>
