import { createRouter, createWebHistory } from "vue-router";
import CharactersVue from "@/views/Characters.vue";
import CharacterDetailsVue from "@/views/CharacterDetails.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/characters",
    },
    {
      path: "/characters",
      name: "characters",
      component: CharactersVue,
    },
    {
      path: "/characters/:id",
      name: "details",
      component: CharacterDetailsVue,
    },
  ],
});

export default router;
