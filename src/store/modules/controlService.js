import controlServiceApi from "@/api/apiList/controlServiceApi"

export default {
	namespaced: true,
	//   state: cloneDeep(INITIAL_STATE),
		state: {
			policyList: {},
			policyToChange: {
				policy: null,
				direction: null
			}
		},
	mutations: {
		setPolicyList(state, payload) {
			state.policyList = payload;
		},
		setPolicyToChange(state, payload){
			state.policyToChange.policy = payload.policy
			state.policyToChange.direction = payload.direction
		}
	},
	actions: {
		async sp_req_b_sys_policy({commit}){
			try {
				const res = await controlServiceApi.sp_req_b_sys_policy()
				commit('setPolicyList', res.data.data)
			} catch(e) {
				console.log(e)
			}
		},
		async sp_admin_change_policy({state}){
			try {
				await controlServiceApi.sp_admin_change_policy({state})
				// location.reload()
			} catch (e) {
				console.log(e)
			}
		},
	},
	getters: {
		getPolicyList(state){
			return state.policyList
		},
	},
};