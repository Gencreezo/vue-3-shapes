<template>
	<div
		ref="shapeRef"
		class="flex items-center justify-center"
		:style="shapeStyle"
		:class="props.shapeStyle.type"
		@mousedown.stop="startDrag"
	>
		<ResizeHandle
			v-if="resizeable && selected"
			v-for="(handle, index) in resizeHandles"
			:key="index"
			:position="handle.position"
			:startResize="startResize"
		/>
		<Shape
			ref="circleShapeRef"
			:shapeStyle="circleShape"
			:resizeHandles="resizeHandles"
			:resizeable="false"
		></Shape>
	</div>
</template>

<script setup>
	import { reactive, ref, defineProps, computed, watchEffect } from 'vue'
	import { useDrag, useResize } from '../../composables/mouse'
	import ResizeHandle from './shape-utils/ResizeHandle.vue'
	import { store } from '@/store/store'

	const props = defineProps([
		'shapeStyle',
		'resizeHandles',
		'resizeable',
		'selected',
	])
	const shapeRef = ref(null)
	const circleShapeRef = ref(null)
	const { startDrag } = useDrag(shapeRef)
	const { startResize } = useResize(shapeRef, '.oval')

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
			borderRadius: type === 'oval' ? '50%' : '0',
		}
	})

	const circleShape = computed(() => {
		const parallelogramArea = props.shapeStyle.width * props.shapeStyle.height
		const radius = Math.sqrt(parallelogramArea / Math.PI)
		return {
			type: 'oval',
			position: 'absolute',
			width: radius * 2,
			height: radius * 2,
			resizeable: false,
		}
	})

	watchEffect(
		() => {
			shapeRef.value.type = shapeStyle.type
		},
		{
			flush: 'post',
		}
	)
</script>
