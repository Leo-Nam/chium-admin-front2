// import appStoreApi from "@/api/apiList/appStoreApi"

export default {
  namespaced: true,
  state: {
	timestamp: null,
	isChanged: false
  },
  mutations: {
	setSSEChanged(state, payload){
		console.log('inside setSSEChanged>>>>', state, payload)
		if (state.timestamp === payload){
			state.isChanged = false
		} else {
			state.isChanged = true
		}
		state.timestamp = payload
	},
  },
  getters: {
	getSSEChanged(state){
		return state.isChanged
	},
  },
};
