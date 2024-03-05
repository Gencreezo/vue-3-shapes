<template>
	<div v-if="isOpen" class="fixed inset-0 flex items-center justify-center">
		<div class="fixed inset-0 bg-black opacity-50"></div>
		<div class="relative text-black bg-white rounded-lg shadow-lg w-fit">
			<div class="absolute top-2 right-4">
				<button
					@click="close"
					class="text-gray-600 hover:text-gray-800 text-2xl"
				>
					&times;
				</button>
			</div>
			<div class="p-4">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue'

	const isOpen = ref(true)

	function open() {
		isOpen.value = true
	}

	const close = () => {
		isOpen.value = false
	}
</script>
