import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// import VueSSE from 'vue-sse'


Vue.config.productionTip = false;

// Vue.$cookies.config("7d");

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App)
}).$mount("#app");

// Vue.use(VueSSE, {
// 	format: 'json',
// 	polyfill: true,
// 	url: '/my-events-server',
// 	withCredentials: true,
//   });
