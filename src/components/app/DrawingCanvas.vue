<template>
	<div class="drawing-canvas text-black">
		<component
			v-for="(shape, i) in shapes"
			:key="shape"
			:ref="(el) => (shapeRefs[i] = el)"
			:is="shape.component"
			:shapeStyle="shape"
			:resizeHandles="defaultResizeHandles"
			:resizeable="shape.resizeable"
			:selected="shape.selected"
			@click="selectShape(shape)"
		/>
		<button
			class="absolute bottom-5 left-1/2 bg-neutral-100 drop-shadow-lg p-2 rounded-md font-semibold"
			@click.stop="clearCanvas"
		>
			Clear Canvas
		</button>
	</div>
</template>

<script setup>
	import { ref, onMounted, watchEffect, toValue } from 'vue'
	import { useMouse } from '@/composables/mouse.js'
	import {
		useVertices,
		useParallelogramAndCircle,
	} from '@/composables/shapes.js'
	import { store } from '@/store/store'

	const defaultResizeHandles = ref([
		{ position: 'top-left' },
		{ position: 'top-right' },
		{ position: 'bottom-left' },
		{ position: 'bottom-right' },
	])

	const shapes = ref([])

	const shapeRefs = ref([])

	const selectedShape = ref(null)

	function addShape(shape) {
		shapes.value.push(shape)
	}

	function clearCanvas() {
		shapes.value = []
		vertices.value = []
	}

	function selectShape(shape) {
		shape.selected = true
		store.setSelectedShape(ref(shape))
	}

	const vertices = useVertices()

	const parallelogramAndCircleStyles = useParallelogramAndCircle(
		vertices,
		addShape
	)
</script>

<style scoped>
	.drawing-canvas {
		width: 100vw;
		height: 100vh;
		background-color: #f0f0f0;
		background-image: url('/images/grid_dot.svg'); /* Path to the background image */
		background-repeat: repeat; /* Fallback color if image fails to load */
	}
</style>

<style>
	.parallelogram {
		position: absolute;
		border: 4px solid blue;
	}
	.oval {
		position: absolute;
		border: 4px solid rgb(255, 230, 0);
	}
</style>
