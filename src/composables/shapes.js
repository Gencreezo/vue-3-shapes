import { ref, watchEffect, toValue } from 'vue'
import { useEventListener } from './event'
import { store } from '@/store/store'

export function useVertices() {
	const vertices = ref([])

	useEventListener(window, 'click', (event) => {
		const newVertex = { x: event.clientX, y: event.clientY }
		vertices.value.push(newVertex)
	})
	store.selectedShape.points = vertices.value
	return vertices
}

export function useParallelogramAndCircle(vertices, addShapeCallback) {
	const createShape = () => {
		if (vertices.value.length === 3) {
			vertices.value.push(calcFourthVertex(vertices.value))
			const sortedVertices = sortVertices(vertices.value)
			const [p1, p2, p3, p4] = sortedVertices
			store.selectedShape.points = sortedVertices

			const width = Math.sqrt(
				Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
			)
			const height = Math.sqrt(
				Math.pow(p4.x - p1.x, 2) + Math.pow(p4.y - p1.y, 2)
			)

			const rotationAngle =
				(Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI
			const skewAngle = (Math.atan2(p3.y - p2.y, p3.x - p2.x) * 180) / Math.PI

			const shape = {
				name: 'Parallelogram',
				component: 'ParallelogramAndOval',
				type: 'parallelogram',
				width: width,
				height: height,
				area: width * height,
				top: p1.y,
				left: p1.x,
				transform: `skew(${skewAngle}deg)`,
				rotate: `${rotationAngle}deg`,
				resizeable: true,
				selected: true,
				childShape: {
					name: 'Circle',
					area: width * height,
				},
			}
			store.setSelectedShape(shape)
			updateCornerPoints(p1.y, p1.x, width, height)
			addShapeCallback(shape)
		}
	}

	const sortVertices = (vertices) => {
		const sortedVertices = vertices.sort((a, b) => {
			if (a.y !== b.y) {
				return a.y - b.y // Sort by y-coordinate
			} else {
				return a.x - b.x // If y-coordinates are equal, sort by x-coordinate
			}
		})
		return sortedVertices
	}
	const calcFourthVertex = (vertices) => {
		// Sort the vertices by their x and y coordinates to ensure they are in the correct order
		const sortedVertices = sortVertices(vertices)

		// Calculate the position of the fourth vertex based on the positions of the other three vertices
		const p1 = sortedVertices[0]
		const p2 = sortedVertices[1]
		const p3 = sortedVertices[2]

		// Determine the direction of the parallelogram based on the relative positions of p1, p2, and p3
		const dx = p3.x - p2.x
		const dy = p3.y - p2.y

		// Calculate the position of the fourth vertex
		const p4 = {
			x: p1.x + dx,
			y: p1.y + dy,
		}

		return p4
	}

	watchEffect(() => {
		createShape()
	})
}

export function calculateRectangleArea(width, height) {
	return parseFloat(width) * parseFloat(height)
}

export function calculateCircleRadius(width, height) {
	return Math.sqrt((parseFloat(width) * parseFloat(height)) / Math.PI)
}

export function calculateCircleArea(radius) {
	return Math.PI * Math.pow(radius, 2)
}

export function updateCornerPoints(top, left, width, height) {
	top = parseFloat(top).toFixed(0)
	left = parseFloat(left).toFixed(0)
	width = parseFloat(width).toFixed(0)
	height = parseFloat(height).toFixed(0)
	console.log(top, left, width, height)
	const updatedCornerPoints = [
		{ x: left, y: top },
		{ x: left + width, y: top },
		{ x: left, y: top + height },
		{ x: left + width, y: top + height },
	]

	// Update the cornerPoints in the store
	store.selectedShape.cornerPoints = updatedCornerPoints
}
