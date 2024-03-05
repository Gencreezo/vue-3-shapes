import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import VueKonva from 'vue-konva'

import ParallelogramAndOval from './components/shapes/ParallelogramAndOval.vue'
import Shape from './components/shapes/Shape.vue'

const app = createApp(App)

app.component('ParallelogramAndOval', ParallelogramAndOval)
app.component('Shape', Shape)

app.use(VueKonva)
app.mount('#app')
