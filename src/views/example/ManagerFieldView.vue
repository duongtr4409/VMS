<template>
	<div>
		<div class="header"><h3>Manager Field</h3></div>
		<div class="body">
			<div class="list-form">
				<ul>
					<li
						class="list-form_item"
						v-for="(value, key) in listFied"
						:key="'listform_' + key"
						@click="changeView(key)"
						:class="{
							selected:
								Object.keys(
									selectedField.properties
										? selectedField.properties
										: {},
								)[0] == Object.keys(value.data)[0],
						}"
					>
						{{ Object.keys(value.data)[0] }}
					</li>
				</ul>
			</div>
			<div class="view-form">
				<div
					v-if="Object.keys(selectedField)[0]"
					class="view-form_body"
				>
					<div class="view-form_body-name">
						{{ Object.keys(selectedField)[0] }}
					</div>
					<div class="columns">
						<div class="column">
							<Container>
								<v-form v-model="valid">
									<v-jsf
										v-model="model"
										:schema="selectedField"
									/>
								</v-form>
							</Container>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="btn-add">
			<label for="add-checkbox"> <v-icon>mdi-plus-circle</v-icon> </label>
		</div>

		<div class="modal-add">
			<input
				type="checkbox"
				name=""
				id="add-checkbox"
				ref="add-checkbox"
				hidden
			/>
			<!-- <label for="add-checkbox"> -->
			<label class="modal-add-overlay" for="add-checkbox"></label>
			<!-- </label> -->
			<div class="modal-add_body">
				<div class="modal-add_body-heading">
					<v-icon>mdi-plus-circle</v-icon> Add Field
				</div>
				<div class="modal-add_body-content">
					<div class="modal-add_body-content_schema">
						<div class="columns">
							<div class="column">
								<textarea
									v-model="createSchemaString"
									placeholder="Json schema object..."
								></textarea>
							</div>
						</div>
					</div>
					<div class="modal-add_body-content_view">
						<div class="columns">
							<div class="column">
								<Container>
									<v-form v-model="valid">
										<v-jsf
											v-model="model"
											:schema="createSchemaObject"
										/>
									</v-form>
								</Container>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-add_footer">
					<div
						class="modal-add_fotter-btn_create"
						@click="saveFiled()"
					>
						Save
					</div>
					<div
						class="modal-add_fotter-btn_close"
						@click="closePopupAddFiled()"
					>
						Close
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
	name: "managerField",
	components: {
		Container,
		//Draggable,
		VJsf,
	},
	data() {
		return {
			valid: null,
			model: {},
			listFied: [],
			selectedField: {},
			createModel: {},
			createSchemaString: "",
			createSchemaObject: {},
		};
	},

	created() {
		console.log("Manager Files created");
	},

	mounted() {
		console.log("Manger Field mounted");
		this.getAllfield();
	},

	methods: {
		getAllfield() {
			this.listFied = [];
			this.axios
				.get("http://localhost:3000/fields")
				.then((response) => {
					if (response?.data) {
						this.listFied = response.data;
					}
				})
				.catch((error) =>
					console.error("Error of getAllField: ", error),
				);
		},

		changeView(index) {
			this.selectedField = {
				type: "object",
				properties: this.listFied[index].data,
			};
		},

		closePopupAddFiled() {
			this.$refs["add-checkbox"].checked = false;
		},

		saveFiled() {
			if (
				this.createSchemaObject.properties &&
				typeof this.createSchemaObject.properties == "object"
			) {
				let data = {
					creater: "DuowngTora",
					createdate: new Date(),
					data: this.createSchemaObject.properties,
				};
				this.axios
					.post("http://localhost:3000/fields", data)
					.then((response) => {
						if (response?.data) {
							alert("Lưu dữ liệu thành công :D");
							this.resetForm();
						}
					})
					.catch((error) => {
						alert("Lưu dữ liệu thất bại: ", error);
					});
			}
		},

		resetForm() {
			this.closePopupAddFiled();
			this.createSchemaObject = {};
			this.createSchemaString = "";
		},
	},

	watch: {
		createSchemaString(newValue, oldValue) {
			console.log("newValue: ", newValue);
			console.log("oldValue: ", oldValue);
			try {
				this.createSchemaObject = JSON.parse(this.createSchemaString);
			} catch (error) {
				console.log(error);
			}
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
	position: relative;
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

/* My CSS */
.btn-add {
	display: inline-block;
	padding: 8px;
	position: fixed;
	bottom: 0;
	right: 0;
	will-change: auto;
	transition: transform linear 0.3;
}

.btn-add i {
	font-size: 48px;
	color: #289fcd;
}

.btn-add:hover {
	cursor: pointer;
	transform: scale(120%);
}

.modal-add {
	position: relative;
}
.modal-add-overlay {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.3);
	display: none;
}

.modal-add_body {
	width: 50%;
	border-radius: 4px;
	margin: auto auto;
	background-color: #fff;
	transform: translateY(-300%);
}

.modal-add_body-heading {
	text-align: center;
	padding: 10px;
	font-size: 24px;
	font-weight: 500;
	color: #289fcd;
}

.modal-add_body-heading i {
	color: #289fcd;
	font-size: 24px;
}

.modal-add_body-content {
	display: flex;
	justify-content: space-evenly;
	margin: 8px 0;
	padding: 8px 0;
}

.modal-add_body-content_schema {
	flex-basis: 23%;
	min-height: 200px;
}

.modal-add_body-content_view {
	flex-basis: 69%;
	min-height: 100px;
	border: 1px solid #333;
}

.modal-add_body-content_schema textarea {
	border: 1px solid #333;
	min-height: 200px;
	padding: 2px;
}

#add-checkbox:checked ~ .modal-add-overlay {
	display: block;
}

#add-checkbox:checked ~ .modal-add_body {
	transform: translateY(0%);
}

.modal-add_footer {
	margin: 24px 0 12px 0;
	text-align: right;
}

.modal-add_fotter-btn_close {
	display: inline-block;
	min-width: 64px;
	text-align: center;
	background-color: #e11125;
	padding: 8px 12px;
	border-radius: 4px;
	color: #fff;
	margin: 0 8px 8px 0;
	cursor: pointer;
	font-weight: 500;
}

.modal-add_fotter-btn_create {
	display: inline-block;
	min-width: 64px;
	text-align: center;
	background-color: #1118e8;
	padding: 8px 12px;
	border-radius: 4px;
	color: #fff;
	margin: 0 8px 8px 0;
	cursor: pointer;
	font-weight: 500;
}

/* end my CSS */
</style>
