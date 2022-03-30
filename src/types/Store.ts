// store.ts
import type { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import type Character from "./Character";

// define your typings for the store state
export interface State {
  url: string;
  list: Character[];
  nextPage: string;
  prevPage: string;
  count: number;
  pages: number;
  selectedCharacter?: Character;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    url: "https://rickandmortyapi.com/api/character",
    list: [],
    nextPage: "",
    prevPage: "",
    count: 0,
    pages: 0,
  },
  mutations: {
    update(state, data) {
      state.list = data.results;
      state.nextPage = data.info.next;
      state.pages = data.info.pages;
      state.count = data.info.count;

      if (data.url) {
        state.url = data.url;
      }
    },
    updateUrl(state, data) {
      state.url = data.url;
    },
    setCharacter(state, data) {
      state.selectedCharacter = data;
    },
  },
  actions: {
    async init(context) {
      const apiResults: {
        info: { next: string; prev: string; pages: number; count: number };
        results: Character[];
      } = await (await fetch(context.state.url)).json();
      context.commit("update", apiResults);
    },
    async search(context, data) {
      const url = `https://rickandmortyapi.com/api/character/?name=${data.query}
				${data.alive ? "&status=alive" : ""}
				${data.dead ? "&status=dead" : ""}
				${data.unknown ? "&status=unknown" : ""}`;
      const apiResults: {
        info: { next: string; prev: string; pages: number; count: number };
        results: Character[];
      } = await (await fetch(url)).json();
      context.commit("update", { ...apiResults, url });
    },
    async goTo(context, data) {
      try {
        let url = "";
        if (data.page) {
          const newUrl = new URL(context.state.url);
          newUrl.searchParams.set("page", data.page);
          url = newUrl.toString();
        }

        const apiResults: {
          info: { next: string; prev: string; pages: number; count: number };
          results: Character[];
        } = await (await fetch(url)).json();
        console.info(apiResults);
        context.commit("update", { ...apiResults, url });
      } catch (e) {
        console.info("error");
        console.error(e);
      }
    },
    async getCharacterById(context, data) {
      const url = `https://rickandmortyapi.com/api/character/${data.id}`;
      const apiResults: Character = await (await fetch(url)).json();

      context.commit("setCharacter", apiResults);
    },
  },
});
