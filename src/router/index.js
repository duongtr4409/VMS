import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ExampleVue from "@/views/example/Example.vue";
import DnDropView from "@/views/example/DndropView.vue";
import DnDropViewV1 from "@/views/example/DndropViewV1.vue";
import MangerFormV1 from "@/views/example/ManagerFormView.vue";
Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/example",
		name: "Example",
		component: ExampleVue,
	},
	{
		path: "/dndrop",
		name: "DnDrop",
		component: DnDropView,
	},
	{
		path: "/v1/dndrop",
		name: "DnDropV1",
		component: DnDropViewV1,
	},
	{
		path: "/v1/managerform",
		name: "MangeForm",
		component: MangerFormV1,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
