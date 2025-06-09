import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// 引用Bootstrap p.s.引用前先npm i bootstrap
// import "bootstrap/dist/css/bootstrap.min.css"; //原生BS
import "@/assets/styles/custom.css"; // 可客製化BS
import "bootstrap";
import store from './store'

// 引用axios  p.s.引用前先npm i axios vue-axios
// import axios from 'axios';
// import VueAxios from 'vue-axios';
// 在main裡import axios失敗

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount('#app');


