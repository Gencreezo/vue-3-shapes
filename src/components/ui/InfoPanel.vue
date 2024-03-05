<template>
	<div
		v-if="store.selectedShape.name"
		class="absolute bottom-5 left-5 text-black bg-white rounded-lg drop-shadow-lg p-8 z-10"
	>
		<div>
			<div class="text-lg font-semibold">{{ store.selectedShape.name }}</div>
			<div>
				<div>Area: {{ store.selectedShape.area }}</div>
				<div>Corner Points:</div>
			</div>
		</div>
		<div v-if="store.selectedShape.childShape">
			<div class="text-lg font-semibold">
				{{ store.selectedShape.childShape.name }}
			</div>
			<div>
				<div>Area: {{ store.selectedShape.childShape.area }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { store } from '@/store/store'
</script>
