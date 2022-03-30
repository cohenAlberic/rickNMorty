import { createApp } from 'vue';
import { store, key } from './types/Store';
import App from './App.vue';
import router from './router';
import { Quasar } from 'quasar';
import iconSet from 'quasar/icon-set/svg-line-awesome';
import '@quasar/extras/line-awesome/line-awesome.css';
import 'quasar/src/css/index.sass';

const app = createApp(App);
app.use(store, key);
app.use(router);

app.use(Quasar, {
	plugins: {},
	iconSet: iconSet, // import Quasar plugins and add here
});
app.mount('#app');
