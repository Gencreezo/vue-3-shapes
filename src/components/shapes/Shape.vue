<template>
	<div
		ref="shapeRef"
		:style="shapeStyle"
		:class="props.shapeStyle.type"
		@mousedown="startDrag"
	>
		<ResizeHandle
			v-if="resizeable"
			v-for="(handle, index) in resizeHandles"
			:key="index"
			:position="handle.position"
			:startResize="startResize"
		/>
	</div>
</template>

<script setup>
	import { reactive, ref, defineProps, computed } from 'vue'
	import { useDrag, useResize } from '../../composables/mouse'
	import ResizeHandle from './shape-utils/ResizeHandle.vue'

	const props = defineProps(['shapeStyle', 'resizeHandles', 'resizeable'])
	const shapeRef = ref(null)
	const { startDrag } = useDrag(shapeRef)
	const { startResize } = useResize(shapeRef)

	const shapeStyle = computed(() => {
		const { type, top, left, width, height, color, transform, rotate, radius } =
			props.shapeStyle
		return {
			position: 'absolute',
			width: `${width}px`,
			height: `${height}px`,
			top: `${top}px`,
			left: `${left}px`,
			transform: type === 'parallelogram' ? transform : '',
			rotate: rotate,
			borderRadius: type === 'oval' ? '50%' : '0',
		}
	})
</script>
