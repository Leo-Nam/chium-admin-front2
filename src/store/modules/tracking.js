export default {
	namespaced: true,
	state: {
		sseTrackingTimeStamp: null,
	},
	mutations: {
		setTrackingTimeStamp(state, payload){
			console.log('before changing setTrackingTimeStamp', state.sseTrackingTimeStamp, payload)
			if(state.sseTrackingTimeStamp !== payload){
				console.log('setTrackingTimeStamp has changed...')
				state.sseTrackingTimeStamp = payload
			}
		},

	},
	actions: {
	},
	getters: {
		getTrackingTimeStamp(state){
			console.log('getTrackingTimeStamp')
			return state.sseTimeStamp
		},
	},
};
