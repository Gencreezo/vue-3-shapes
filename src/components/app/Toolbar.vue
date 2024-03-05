<template>
	<div class="toolbar">
		<div
			v-for="(button, index) in buttons"
			:key="index"
			class="toolbar-button"
			@click="handleButtonClick(button)"
		>
			{{ button.label }}
		</div>
	</div>
</template>

<script>
	import { reactive } from 'vue'
	import { store } from '../../store/store.js'
	export default {
		props: {
			buttons: {
				type: Array,
				required: true,
			},
		},
		methods: {
			handleButtonClick(button) {
				// Emit an event to notify the parent component about the button click
				this.$emit('button-click', button)
			},
		},
		setup() {
			const state = reactive({ count: 0 })
		},
	}
</script>

<style scoped>
	.toolbar {
		position: fixed;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 20px;
		background-color: rgba(255, 255, 255, 0.8);
		padding: 10px;
		display: flex;
		justify-content: space-around;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	.toolbar-button {
		padding: 8px 16px;
		border-radius: 20px;
		background-color: #4caf50;
		color: white;
		cursor: pointer;
	}

	.toolbar-button:hover {
		background-color: #45a049;
	}
</style>
