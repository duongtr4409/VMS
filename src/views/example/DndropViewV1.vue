<template>
	<div class="demo">
		<div class="columns">
			<Container
				:data-index="index"
				group-name="column"
				:get-child-payload="
					(itemIndex) => getChildPayload_Selector(itemIndex)
				"
				:should-accept-drop="
					(src, payload) => getShouldAcceptDrop(0, src, payload)
				"
				:should-animate-drop="
					(src, payload) => getShouldAnimateDrop(0, src, payload)
				"
				@drag-start="onDragStart"
				@drag-enter="onDragEnter(0)"
				@drag-leave="onDragLeave(0)"
				@drag-end="onDragEnd"
				@drop-not-allowed="dropNotAllowed"
				@drop="onDrop(0, $event, true)"
			>
				<Draggable
					v-for="(item, index) in selectors"
					:key="'selectors_' + index"
				>
					<div class="draggable-item">{{ item.data }}</div>
					<v-form v-model="valid">
						<v-jsf v-model="item.model" :schema="item.schema" />
					</v-form>
				</Draggable>
			</Container>
		</div>

		<div class="columns">
			<div v-for="(items, index) in groups" :key="index" class="column">
				<Container
					:data-index="index"
					group-name="column"
					:get-child-payload="
						(itemIndex) => getChildPayload(index, itemIndex)
					"
					:should-accept-drop="
						(src, payload) =>
							getShouldAcceptDrop(index, src, payload)
					"
					:should-animate-drop="
						(src, payload) =>
							getShouldAnimateDrop(index, src, payload)
					"
					@drag-start="onDragStart"
					@drag-enter="onDragEnter(index)"
					@drag-leave="onDragLeave(index)"
					@drag-end="onDragEnd"
					@drop-not-allowed="dropNotAllowed"
					@drop="onDrop(index, $event, false)"
				>
					<Draggable v-for="item in items" :key="item.id">
						<div class="draggable-item">{{ item.data }}</div>
						<v-form v-model="valid">
							<v-jsf v-model="item.model" :schema="item.schema" />
						</v-form>
					</Draggable>
				</Container>
			</div>
		</div>
		<div class="controls">
			<div class="buttons">
				<button
					class="button remove"
					@click="removeColumn()"
					:disabled="groups.length === 1"
				>
					Remove Column
				</button>
				<button class="button add" @click="addColumn()">
					Add Column
				</button>
			</div>
		</div>

		<div class="controls">
			<div class="buttons">
				<button class="button add" @click="saveForm()">
					<b>Save Form</b>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { Container, Draggable } from "vue-dndrop";
import { applyDrag, generateItems } from "../../utils/helpers.js";
import Vue from "vue";
import VJsf from "@koumoul/vjsf/lib/VJsf.js";
import "@koumoul/vjsf/lib/VJsf.css";
import "@koumoul/vjsf/lib/deps/third-party.js";

let i = 0;

function id() {
	return `item-${++i}`;
}

function generate(num) {
	return generateItems(0, (i) => ({
		id: id(),
		data: `Draggable ${num} - ${i + 1}`,
		model: {},
		schema: "<h1>Duowng</h1>",
	}));
}

function initSelector(num, objJson, name) {
	return generateItems(1, (i) => ({
		id: id(),
		data: `Draggable ${num} - ${i + 1}: ${name}`,
		model: {},
		schema: objJson,
	}));
}

export default {
	name: "DnDropV1",
	components: {
		Container,
		Draggable,
		VJsf,
	},

	data() {
		return {
			groups: [],
			flags: [],
			valid: null,
			selectors: [],
			logs: {
				"get-child-payload": true,
				"should-accept-drop": false,
				"should-animate-drop": false,
				"drag-start": true,
				"drag-end": true,
				"drag-enter": true,
				"drag-leave": true,
				"drop-not-allowed": true,
				drop: true,
			},
			logPayload: true,
		};
	},

	async created() {
		await this.getAllField();
		// this.initSeletors();
		// this.addColumn();
		this.addColumn();
	},

	methods: {
		// -----------------------------------------------------------------------------------------------------------------
		// callbacks

		getChildPayload(groupIndex, itemIndex) {
			this.log("get-child-payload", groupIndex, itemIndex);
			return this.groups[groupIndex][itemIndex];
		},

		getShouldAcceptDrop(index, sourceContainerOptions, payload) {
			this.log("should-accept-drop", sourceContainerOptions, payload);
			return this.flags[index].drop;
		},

		getShouldAnimateDrop(index, sourceContainerOptions, payload) {
			this.log("should-animate-drop", sourceContainerOptions, payload);
			return this.flags[index].animate;
		},

		// -----------------------------------------------------------------------------------------------------------------
		// events

		onDrop(groupIndex, dropResult, isNoRemove) {
			console.log("onDrop: dropResult: ", dropResult);
			let result = applyDrag(
				this.groups[groupIndex],
				dropResult,
				isNoRemove,
			);
			Vue.set(this.groups, groupIndex, result);
			this.log("drop", dropResult);
		},

		dropNotAllowed(...args) {
			this.log("drop-not-allowed", ...args);
		},

		// -----------------------------------------------------------------------------------------------------------------
		// app

		initSeletors() {
			var listSelector = [];
			this.selectors.forEach((element) => {
				listSelector.push(
					initSelector(1, element.schema, element.name)?.[0],
				);
			});
			this.groups.push(listSelector);
			this.flags.push({ drop: true, animate: true });
		},

		async getAllField() {
			this.selectors = [];
			await this.axios
				.get("http://localhost:3000/fields")
				.then((response) => {
					if (response?.data) {
						console.log("getAllFields: ", response.data);
						response.data.forEach((ele) => {
							this.selectors.push({
								model: {},
								schema: {
									type: "object",
									properties: ele,
								},
							});
						});
					}
				})
				.catch((exception) => alert(exception));
		},

		addColumn() {
			this.groups.push(generate(this.groups.length + 1));
			this.flags.push({ drop: true, animate: true });
		},

		removeColumn() {
			this.groups.pop();
			this.flags.pop();
		},

		log(name, ...args) {
			if (this.logs[name]) {
				this.logPayload
					? console.log(name, ...args)
					: console.log(name);
			}
		},

		// Selectors Function
		getChildPayload_Selector(itemIndex) {
			return this.selectors[itemIndex];
		},

		async reset() {
			this.groups = [];
			this.flags = [];
			await this.getAllField();
			this.addColumn();
		},

		async saveForm() {
			let data = {
				creater: "DuowngTora",
				createdate: new Date(),
				form: this.groups,
			};
			await this.axios
				.post("http://localhost:3000/forms", data)
				.then((response) => {
					alert("Lưu From Thành Công: ", response?.id);
					this.reset();
				})
				.catch((exception) => alert(exception));
		},
	},
};
</script>

<style scoped>
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
