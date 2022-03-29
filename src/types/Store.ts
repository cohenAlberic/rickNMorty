// store.ts
import type { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import type Character from './Character';

// define your typings for the store state
export interface State {
	url: string;
	list: Character[];
	nextPage: string;
	prevPage: string;
	count: number;
	pages: number;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state: {
		url: 'https://rickandmortyapi.com/api/character',
		list: [],
		nextPage: '',
		prevPage: '',
		count: 0,
		pages: 0,
	},
	mutations: {
		update(state, data) {
			state.list = data.results;
			state.nextPage = data.info.next;
			state.pages = data.info.pages;
			state.count = data.info.count;
			state.url = data.url;
		},
		updateUrl(state, data) {
			state.url = data.url;
		},
	},
	actions: {
		async init(context) {
			console.info('init');
			const apiResults: {
				info: { next: string; prev: string; pages: number; count: number };
				results: Character[];
			} = await (await fetch(context.state.url)).json();
			context.commit('update', apiResults);
		},
		async search(context, data) {
			const url = `https://rickandmortyapi.com/api/character/?name=${
				data.query
			}${data.alive ? '&status=alive' : ''}${data.dead ? '&status=dead' : ''}${
				data.unknown ? '&status=unknown' : ''
			}`;
			const apiResults: {
				info: { next: string; prev: string; pages: number; count: number };
				results: Character[];
			} = await (await fetch(url)).json();
			context.commit('update', { ...apiResults, url });
		},
		async goTo(context, data) {
			let url = '';
			if (data.page) {
				const newUrl = new URL(context.state.url);
				newUrl.searchParams.set('page', data.page);
				url = newUrl.toString();
			} else {
				url = data.next ? context.state.nextPage : context.state.prevPage;
			}

			const apiResults: {
				info: { next: string; prev: string; pages: number; count: number };
				results: Character[];
			} = await (await fetch(url)).json();
			context.commit('update', { ...apiResults, url });
		},
	},
});
