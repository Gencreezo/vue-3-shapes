<template>
	<div
		:class="'resize-handle ' + position"
		@mousedown.stop="startResize(position, $event)"
	></div>
</template>

<script setup>
	import { defineProps } from 'vue'

	const props = defineProps(['position', 'startResize'])
</script>

<style scoped>
	.resize-handle {
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: red;
		cursor: pointer;
		border-radius: 50%;
		z-index: 10;
	}
	.top-left {
		top: -5px;
		left: -5px;
	}
	.top-right {
		top: -5px;
		right: -5px;
	}
	.bottom-left {
		bottom: -5px;
		left: -5px;
	}
	.bottom-right {
		bottom: -5px;
		right: -5px;
	}
</style>
