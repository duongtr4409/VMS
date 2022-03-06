<template>
	<v-app>
		<AppBar v-if="user"></AppBar>
		<NavigationDrawers v-if="user"></NavigationDrawers>
		<v-main>
			<VuePerfectScrollbar>
				<v-container>
					<router-view></router-view>
				</v-container>
			</VuePerfectScrollbar>
		</v-main>
	</v-app>
</template>

<script>
import NavigationDrawers from "./views/layout/NavigationDrawers.vue";
import AppBar from "./views/layout/AppBar.vue";
import User from "./models/user.model";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
	name: "App",
	components: { VuePerfectScrollbar, NavigationDrawers, AppBar },
	data() {
		return {
			user: new User(),
		};
	},
};
</script>
