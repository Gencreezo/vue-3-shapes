<template>
	<main>
		<DrawingCanvas />
		<InfoPanel />
		<Dialog v-if="isOpen">
			<h3 class="text-2xl font-bold">How to use:</h3>
			<p>
				This application draws a parallelogram and a circle. Both shapes share
				the same are size and center of mass.
			</p>
			<h4 class="text-xl font-semibold mt-4">To draw the shapes:</h4>
			<ol class="list-decimal list-inside">
				<li>Place 3 arbritrary points by clicking on the canvas.</li>
				<li>
					The application will use those points to calculate the 4th point to
					draw a Parallelogram.
				</li>
				<li>
					The Parallelogram will appear on the canvas along with a circle.
				</li>
			</ol>
			<h4 class="text-xl font-semibold mt-4">Moving the shape:</h4>
			<p>
				The shape can be move by clicking and holding anywhere on the shapes
				surface and then moving your cursor.
			</p>
			<h4 class="text-xl font-semibold mt-4">Resizing the shape:</h4>
			<p>
				The shape can be resized by clicking and holding any of the red dots in
				the corner of the shape and moving your cursor.
			</p>
			<h4 class="text-xl font-semibold mt-4">Delete Shapes</h4>
			<p>
				The canvas only allows one element at a time.<br />
				To clear the canvas click the button "Clear Canvas" in the bottom middle
				of the screen
			</p>
		</Dialog>
		<button
			class="absolute bottom-5 right-5 text-black font-semibold bg-blue-100 p-2 rounded-md drop-shadow-lg"
			@click.stop="openDialog"
		>
			Info
		</button>
	</main>
</template>

<script setup>
	import { ref } from 'vue'
	import DrawingCanvas from './components/app/DrawingCanvas.vue'
	import InfoPanel from '@/components/ui/InfoPanel.vue'
	import Dialog from '@/components/ui/Dialog.vue'

	const isOpen = ref(false)

	const openDialog = () => {
		isOpen.value = !isOpen.value
	}
</script>

<style scoped></style>
