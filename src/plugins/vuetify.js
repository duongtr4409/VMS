import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			dark: {},
			light: {},
		},
		options: {
			themeCache: {
				get: (key) => localStorage.getItem(key),
				set: (key, value) => localStorage.setItem(key, value),
			},
		},
	},
});
