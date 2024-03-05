import { reactive } from 'vue'

export const store = reactive({
	selectedTool: null,
	selectedShape: {},
	setSelectedShape(shape) {
		this.selectedShape = shape
	},
})
