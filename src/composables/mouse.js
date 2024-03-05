// mouse.js
import { ref, watchEffect } from 'vue'
import { useEventListener } from './event'
import {
	calculateCircleRadius,
	calculateRectangleArea,
	calculateCircleArea,
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
			element.value.style.top =
				element.value.offsetTop - positions.movementY + 'px'
			element.value.style.left =
				element.value.offsetLeft - positions.movementX + 'px'
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

			store.selectedShape.area = calculateRectangleArea(
				element.value.style.width,
				element.value.style.height
			)

			if (childSelector) {
				const childElement = element.value.querySelector(childSelector)
				if (childElement) {
					let radius = calculateCircleRadius(
						element.value.style.width,
						element.value.style.height
					)
					childElement.style.width = `${radius * 2}px`
					childElement.style.height = `${radius * 2}px`
					store.selectedShape.childShape = {
						name: 'Circle',
						area: calculateCircleArea(radius),
					}
					console.log(store.selectedShape)
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
