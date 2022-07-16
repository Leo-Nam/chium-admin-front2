import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import globalConfig from "./globalConfig"
// import VueSSE from 'vue-sse'


Vue.config.productionTip = false;
Vue.designConfig = 1280

// Vue.$cookies.config("7d");

new Vue({
	router,
	store,
	vuetify,
	globalConfig,
	render: (h) => h(App)
}).$mount("#app");

// Vue.use(VueSSE, {
// 	format: 'json',
// 	polyfill: true,
// 	url: '/my-events-server',
// 	withCredentials: true,
//   });
