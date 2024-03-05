<template>
	<div class="background">
		<v-stage
			ref="stage"
			:config="configKonva"
			@mousedown="handleStageMouseDown"
			@touchstart="handleStageMouseDown"
		>
			<v-layer ref="layer">
				<Parallelogram :config="shape" />
				<v-transformer ref="transformer"></v-transformer>
			</v-layer>
		</v-stage>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import Konva from 'konva'
	import { useParallelogramAndCircle } from '../../composables/shapes.js'
	import Parallelogram from '../shapes/Parallelogram.vue'
	const props = defineProps(['selectedFunction'])

	const configKonva = {
		width: window.innerWidth,
		height: window.innerHeight,
	}
	const shape = useParallelogramAndCircle()
	const transformer = ref(null)

	var selectedShapeName = ''

	function handleStageMouseDown(e) {
		// clicked on stage - clear selection
		if (e.target === e.target.getStage()) {
			selectedShapeName = ''
			updateTransformer()
			return
		}

		// clicked on transformer - do nothing
		const clickedOnTransformer =
			e.target.getParent().className === 'Transformer'
		if (clickedOnTransformer) {
			return
		}

		// find clicked rect by its name
		const name = e.target.name()
		console.log(name)
		selectedShapeName = name
		console.log(selectedShapeName)
		updateTransformer(name)
	}
	function updateTransformer(selectedShapeName) {
		const transformerNode = transformer.value.getNode()
		const stage = transformerNode.getStage()

		console.log(transformerNode)
		// Find the selected node by name
		const selectedNode = stage.findOne('.' + selectedShapeName)
		console.log(selectedNode)
		selectedNode.getSelfRect = function () {
			return {
				x: 200,
				y: 200,
				width: 200,
				height: 200,
			}
		}

		if (selectedNode) {
			// Get the bounding box of the selected shape

			// Bind transformer to the selected shape
			transformerNode.nodes([selectedNode])
		} else {
			// If no selected shape, remove transformer
			transformerNode.nodes([])
		}
	}
</script>

<style scoped>
	.background {
		background-color: #f0f0f0;
		background-image: url('/images/grid_dot.svg'); /* Path to the background image */
		background-repeat: repeat;
	}
</style>
