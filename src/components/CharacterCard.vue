<script setup lang="ts">
import type Character from "@/types/Character";

const prop = defineProps<{ char: Character }>();
</script>

<template>
  <q-card :class="`card ${prop.char.status.toLowerCase()}`" bordered>
    <q-img :src="prop.char.image">
      <div class="absolute-bottom title">
        <p class="absolute-center text-h6 text-center">
          {{ prop.char.name }}
        </p>
      </div>
    </q-img>
  </q-card>
</template>

<style src="@/style/characterCard.scss" lang="scss" scoped></style>
