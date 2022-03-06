<template>
	<div>
		<h1>Example</h1>
		<v-form v-model="valid">
			<v-jsf v-model="model" :schema="schema" />
		</v-form>
		<v-btn @click="randomize()" elevation="2">Randomize</v-btn>
	</div>
</template>

<script>
import VJsf from "@koumoul/vjsf/lib/VJsf.js";
import "@koumoul/vjsf/lib/VJsf.css";
import "@koumoul/vjsf/lib/deps/third-party.js";
export default {
	name: "App",
	components: { VJsf },
	data: () => ({
		valid: false,
		model: {},
		schema: {},
	}),
	mounted() {
		this.axios.get("http://192.168.100.25:3000/schema").then((response) => {
			this.schema = response.data;
		});
	},
	methods: {
		randomize() {
			this.axios
				.get("http://192.168.100.25:3000/schema")
				.then((response) => {
					this.schema = response.data;
				});
		},
	},
};
</script>

<style></style>
