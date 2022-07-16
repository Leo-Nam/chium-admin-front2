const methods = {
	console_log(str){
		console.log(str)
	}
}

export default {
	install(Vue) {
		Vue.config.globalProperties.$log = methods.console_log
	}
}