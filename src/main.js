import { createSSRApp } from "vue";
import App from "./App.vue";
import bootstrap from './bootstrap'

import 'uno.css';

export function createApp() {
	const app = createSSRApp(App)
		.use(bootstrap)
	return {
		app,
	};
}
