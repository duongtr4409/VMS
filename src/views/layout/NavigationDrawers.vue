<template>
	<v-navigation-drawer
		v-model="drawer"
		:mini-variant.sync="mini"
		dark
		src="/img/backgrounds/bg-2.jpg"
		permanent
		app
	>
		<v-list>
			<v-list-item @click.stop="mini = !mini" link>
				<v-list-item-icon>
					<v-icon>mdi-menu</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title>{{
						$t("title.menu")
					}}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-list-item v-for="item in items" :key="item.title" link>
				<router-link :to="item.link">
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</router-link>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	data() {
		return {
			drawer: false,
			items: [
				{ title: "Home", icon: "mdi-home", link: "/" },
				{ title: "My Account", icon: "mdi-account", link: "/" },
				{
					title: "Users",
					icon: "mdi-account-group-outline",
					link: "/",
				},
				{
					title: "Create Form",
					icon: "mdi-content-paste",
					link: "/v1/dndrop",
				},
				{
					title: "Manger Form",
					icon: "mdi-folder-multiple-outline",
					link: "/v1/managerform",
				},
			],
			mini: true,
		};
	},
};
</script>

<style></style>
