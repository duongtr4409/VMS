<template>
	<v-app-bar dense elevation="4" flat app>
		<v-switch v-model="$vuetify.theme.dark"></v-switch>
	</v-app-bar>
</template>

<script>
export default {
	name: "AppBar",
	props: {
		attrs: {
			type: Object,
			default: () => ({}),
		},
	},
	data: () => {
		return {};
	},
};
</script>

<style></style>
