<template>
	<div
		v-if="store.selectedShape.name"
		class="absolute bottom-5 left-5 text-black bg-white rounded-lg drop-shadow-lg p-8 z-10 w-1/4"
	>
		<div>
			<div class="text-lg font-semibold">{{ store.selectedShape.name }}</div>
			<div>
				<div>Area: {{ store.selectedShape.area.toFixed(2) }}</div>
				<div>
					Corner Points:
					<div
						v-for="(point, i) in store.selectedShape.cornerPoints"
						class="ml-4"
					>
						{{ `Point ${i + 1}: (${point.x}, ${point.y})` }}
					</div>
				</div>
			</div>
		</div>
		<div v-if="store.selectedShape.childShape" class="mt-2">
			<div class="text-lg font-semibold">
				{{ store.selectedShape.childShape.name }}
			</div>
			<div>
				<div>Area: {{ store.selectedShape.childShape.area.toFixed(2) }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { store } from '@/store/store'
</script>
