import addAdminApi from "@/api/apiList/addAdminApi"

export default {
  namespaced: true,
  state: {
	adminDetails: {
		name: null,
		classCode: null,
		department: null,
		userId: null,
		password: null,
		phone: null
	},
	departmentObj: {},
	department: [],
  },
  mutations: {
	setAdminDetails(state, payload){
		state.adminDetails = payload
	},
	setDepartmentList(state, payload){
		state.departmentObj=payload
		state.department = []
		for (var i=0;i<payload.length;i++){
			state.department.push(payload[i].NAME)
		}
	},
	setDepartmentItem(state, payload){
		for(var i=0;i<state.departmentObj.length;i++){
			if(state.departmentObj[i].NAME === payload){
				state.adminDetails.department=state.departmentObj[i].ID
			}
		}
	},
    changeAdminDetail(state,{key,value}){
      // 키, 값을 받아와 비딩 값 변경
      state.adminDetails[key] = value
		if (key === 'phone'){
			state.adminDetails['userId'] = value
		}
    }
  },
  actions: {
	async sp_req_b_department({commit}){
		try {
			const res = await addAdminApi.sp_req_b_department()
			commit('setDepartmentList', res.data.data)
		} catch(e) {
			console.log(e)
		}
	},
	async sp_admin_insert_manager({state}){
		try {
			await addAdminApi.sp_admin_insert_manager(state)
		} catch(e) {
			console.log(e)
		}
	},
  },
  getters: {
	getDepartment(state){
		return state.department
	},
  },
};
