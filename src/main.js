import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './styles/index.css';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

import VIntersection from "@/directives/VIntersection";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

library.add(faXmark);


const app = createApp(App);

app.directive(VIntersection.name ,VIntersection);

app.use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
