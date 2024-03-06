// mouse.js
import { ref, watchEffect } from 'vue'
import { useEventListener } from './event'
import {
	calculateCircleRadius,
	calculateRectangleArea,
	calculateCircleArea,
	updateCornerPoints,
} from './shapes'
import { store } from '@/store/store'

export function useMouse() {
	const x = ref(0)
	const y = ref(0)

	useEventListener(window, 'mousemove', (event) => {
		x.value = event.pageX
		y.value = event.pageY
	})

	return { x, y }
}

export function useDrag(element) {
	const positions = {
		clientX: undefined,
		clientY: undefined,
		movementX: 0,
		movementY: 0,
	}

	function startDrag() {
		event.preventDefault()
		positions.clientX = event.clientX
		positions.clientY = event.clientY
		document.onmousemove = (e) => {
			e.preventDefault()
			positions.movementX = positions.clientX - e.clientX
			positions.movementY = positions.clientY - e.clientY
			positions.clientX = e.clientX
			positions.clientY = e.clientY

			// Update the position of the element
			const newTop = element.value.offsetTop - positions.movementY
			const newLeft = element.value.offsetLeft - positions.movementX
			element.value.style.top = newTop + 'px'
			element.value.style.left = newLeft + 'px'

			// Recalculate the corner points
			const width = parseInt(element.value.style.width)
			const height = parseInt(element.value.style.height)

			updateCornerPoints(newTop, newLeft, width, height)
		}
		document.onmouseup = () => {
			document.onmousemove = null
			document.onmouseup = null
		}
	}
	return { startDrag }
}

export function useResize(element, childSelector) {
	function startResize(direction, event) {
		event.preventDefault()
		const initialWidth = element.value.offsetWidth
		const initialHeight = element.value.offsetHeight
		const initialX = element.value.offsetLeft
		const initialY = element.value.offsetTop
		const startX = event.clientX
		const startY = event.clientY

		document.onmousemove = (e) => {
			e.preventDefault()
			const deltaX = e.clientX - startX
			const deltaY = e.clientY - startY

			switch (direction) {
				case 'top-left':
					element.value.style.width = `${initialWidth - deltaX}px`
					element.value.style.height = `${initialHeight - deltaY}px`
					element.value.style.top = `${initialY + deltaY}px`
					element.value.style.left = `${initialX + deltaX}px`
					break
				case 'top-right':
					element.value.style.width = `${initialWidth + deltaX}px`
					element.value.style.height = `${initialHeight - deltaY}px`
					element.value.style.top = `${initialY + deltaY}px`
					break
				case 'bottom-left':
					element.value.style.width = `${initialWidth - deltaX}px`
					element.value.style.height = `${initialHeight + deltaY}px`
					element.value.style.left = `${initialX + deltaX}px`
					break
				case 'bottom-right':
					element.value.style.width = `${initialWidth + deltaX}px`
					element.value.style.height = `${initialHeight + deltaY}px`
					break
			}

			let width = element.value.style.width
			let height = element.value.style.height
			let top = element.value.style.top
			let left = element.value.style.left

			store.selectedShape.area = calculateRectangleArea(width, height)

			updateCornerPoints(top, left, width, height)

			if (childSelector) {
				const childElement = element.value.querySelector(childSelector)
				if (childElement) {
					let radius = calculateCircleRadius(width, height)
					childElement.style.width = `${radius * 2}px`
					childElement.style.height = `${radius * 2}px`
					store.selectedShape.childShape = {
						name: 'Circle',
						area: calculateCircleArea(radius),
					}
				}
			}
		}

		document.onmouseup = () => {
			document.onmousemove = null
			document.onmouseup = null
		}
	}

	return { startResize }
}
