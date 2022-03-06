import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "@/assets/styles/main.css";
import vuetify from "./plugins/vuetify";
import VueDraggable from "vuedraggable";
import i18n from "./i18n";
import VJsf from "@koumoul/vjsf";
import "@koumoul/vjsf/dist/main.css";
import axios from "axios";
import VueAxios from "vue-axios";
import { GlobalService } from "./services/global.service";
// load third-party dependencies (markdown-it, vuedraggable)
// you can also load them separately based on your needs
// import "@koumoul/vjsf/dist/third-party.js";
Vue.use(VueAxios, axios);
Vue.component("VJsf", VJsf);
Vue.component(VueDraggable);
Vue.config.productionTip = false;
new Vue({
	router,
	store,
	i18n,
	vuetify,
	globalService: new GlobalService(axios),
	render: (h) => h(App),
}).$mount("#app");
