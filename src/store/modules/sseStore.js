// import appStoreApi from "@/api/apiList/appStoreApi"

export default {
  namespaced: true,
  state: {
	sseData: {
		timestamp: null,
		table: null,
		type: null,
	},
	isChanged: false
  },
  mutations: {
	setSSEChanged(state, payload){
		console.log('inside setSSEChanged>>>>', state, payload/1000, Math.floor(Date.now())/1000)
		if (state.sseData === payload){
			state.isChanged = false
		} else {
			state.isChanged = true
		}
		state.sseData = payload
	},
  },
  getters: {
	getSSEChanged(state){
		return state.isChanged
	},
  },
};
