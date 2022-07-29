// import appStoreApi from "@/api/apiList/appStoreApi"

export default {
  namespaced: true,
  state: {
	sseData: {
		timestamp: null,
		table: null,
		type: null,
	},
	sseTrackingData: {
		id: null,
		lat: null,
		lng: null,
		timestamp: null,
	},
	isChanged: false,
	isTrackingChanged: false
  },
  mutations: {
	setSSEChanged(state, payload){
		if (state.sseData === payload){
			state.isChanged = false
		} else {
			state.isChanged = true
		}
		state.sseData = payload
	},
	setTrackingChanged(state, payload){
		if (state.sseTrackingData === payload){
			state.isTrackingChanged = false
		} else {
			state.isTrackingChanged = true
		}
		state.sseTrackingData = payload
	},
  },
  getters: {
	getSSEChanged(state){
		return state.isChanged
	},
	getTrackingInfo(state){
		return state.sseTrackingData
	},
  },
};
