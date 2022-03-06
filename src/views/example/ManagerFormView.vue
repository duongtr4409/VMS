<template>
	<div>
		<div class="header"><h3>Manager Forms</h3></div>
		<div class="body">
			<div class="list-form">
				<ul>
					<li
						class="list-form_item"
						v-for="(value, key) in listForm"
						:key="'listform_' + key"
						@click="changeView(key)"
						:class="{ selected: selectedForm.id == value.id }"
					>
						{{ value.id }} : {{ value.creater }}
					</li>
				</ul>
			</div>
			<div class="view-form">
				<div v-if="selectedForm.id" class="view-form_body">
					<div class="view-form_body-name">
						{{ selectedForm.id }} : {{ selectedForm.creater }}
					</div>
					<div class="columns">
						<div
							class="column"
							v-for="(items, index) in selectedForm.form"
							:key="'selectedfrom_' + index"
						>
							<Container>
								<template v-for="item in items">
									<div
										class="draggable-item"
										:key="'selecterform_' + item.id"
									></div>
									<v-form
										v-model="valid"
										:key="'selecterform_' + item.id"
									>
										<v-jsf
											v-model="item.model"
											:schema="item.schema"
										/>
									</v-form>
								</template>
							</Container>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Container /*Draggable*/ } from "vue-dndrop";
// import { applyDrag, generateItems } from "../../utils/helpers.js";
// import Vue from "vue";
import VJsf from "@koumoul/vjsf/lib/VJsf.js";
import "@koumoul/vjsf/lib/VJsf.css";
import "@koumoul/vjsf/lib/deps/third-party.js";

export default {
	name: "managerForm",
	components: {
		Container,
		//Draggable,
		VJsf,
	},
	data: () => {
		return {
			valid: null,
			listForm: [],
			selectedForm: {},
		};
	},
	async mounted() {
		console.log("mounted");
		await this.getAllForm();
	},
	created() {
		console.log("created");
	},
	methods: {
		async getAllForm() {
			this.listForm = [];
			await this.axios
				.get("http://localhost:3000/forms")
				.then((response) => {
					if (response?.data) {
						console.log("response: ", response.data);
						this.listForm = response.data;
					}
				})
				.catch((error) => console.log("Error of GetAllForm: ", error));
		},

		changeView(key) {
			this.selectedForm = this.listForm[key];
		},
	},
};
</script>

<style scoped>
.header {
	font-size: 24px;
	font-weight: 600;
	text-align: center;
	margin: 20px 0;
}

.body {
	width: 100%;
	display: flex;
}
/* List From style */
.list-form {
	width: 20%;
	margin-right: 8px;
}

.view-form {
	width: 80%;
}

.list-form {
	background-image: linear-gradient(rgb(10, 99, 128), rgb(255, 255, 255));
}

.list-form ul {
	list-style: none;
	padding: 8px 16px;
	color: #fff;
}

.list-form ul li {
	cursor: pointer;
	font-size: 16px;
	transition: transform linear 0.2;
}

.list-form ul li:hover {
	font-weight: 600;
	transform: translateY(-2px) translateX(2px);
}

.list-form_item.selected {
	color: red;
	font-weight: 600;
}
/* end List From style */

/* View From Style */
.view-form_body {
	padding: 8px;
	border: 1px solid #333;
}

.view-form_body-name {
	font-size: 20px;
	font-weight: 600;
	text-align: center;
	margin: 0 0 12px;
	padding: 0 0 8px;
	border-bottom: 1px solid #333;
}

.controls {
	display: flex;
	flex-direction: column;
	margin-top: 1em;
}
.controls .title {
	align-self: flex-start;
	margin: 0 1rem;
}
.controls .buttons {
	align-self: flex-end;
	margin: 1rem;
}

.controls .actions {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin: 0 1rem;
}

.controls > div {
	padding-top: 1em;
}

.buttons,
.column-actions {
	display: flex;
	gap: 1rem;
}

.column-actions {
	justify-content: space-evenly;
}

.buttons .button {
	background-color: white;
	border: 1px solid #e0e0e0;
	border-left: 5px solid #c4ebaf;
	border-radius: 4px;
	padding: 0.5rem;
	cursor: pointer;
	transition: border-color 0.2s linear;
}

.buttons .button.remove {
	border-left: 5px solid #dc3545;
}

.buttons .button.remove:disabled {
	border-left: 5px solid #e0e0e0;
}

.buttons .button.add {
	border-left: 5px solid #c4ebaf;
}

label {
	display: block;
	line-height: 1.6em;
}

.columns {
	display: flex;
	gap: 0.5rem;
	justify-content: stretch;
}

.column {
	flex: 1;
	border-radius: 6px;
	/* border: 1px solid #e0e0e0; */
}

.column {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
}

.column .dndrop-container.vertical {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	cursor: pointer;
}
</style>
