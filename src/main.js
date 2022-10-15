import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
//import axios
import axios from "axios";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import Paginate from "vuejs-paginate-next";

axios.defaults.baseURL = "http://localhost:8000/";

//set credential axios with true
axios.defaults.withCredentials = true;

createApp(App).use(VueSweetalert2).use(Paginate).use(router).mount("#app");
