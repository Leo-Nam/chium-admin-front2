import versionControlApi from "@/api/apiList/versionControlApi"

export default {
	namespaced: true,
	state: {
		versionInfo: {
			PROJECT_ID: 1,
			CONTENT: null,
			VERSION: null
		},
		searchObj : {
			pageOffset: 0,
			pageSize: 15,
			// 현재 페이지 번호
			pageNum: 1,
			// 마지막 페이지 번호
			lastPageNum: 10,
			// 검색어
			search: null,
		},
		versionList: [],
		projectList: [],
	},
	mutations: {
		setProjectList(state, payload) {
			state.projectList = payload;
		},
		// 현재 페이지 번호
		setPageNum(state, payload) {
			state.searchObj.pageNum = payload;
			if (state.searchObj.pageNum == 1) {
				state.searchObj.pageOffset = 0;
			} else {
				state.searchObj.pageOffset =
				(state.searchObj.pageNum - 1) * state.searchObj.pageSize;
			}
		},
		setVersionList(state,payload){
			if (payload) {
				state.versionList = payload.VERSION_LIST;
				state.searchObj.lastPageNum = Number(payload.LAST_PAGE);
			} else {
			// 비어있다면 초기화 시켜준다.
				state.versionList = [];
				state.searchObj.lastPageNum = 0;
			}
		},
		setChangedProject(state, payload){
			state.versionInfo.PROJECT_ID = payload
		},
		setChangedVersionContent(state, payload){
			state.versionInfo.CONTENT = payload
		},
		setChangedVersionNew(state, payload){
			state.versionInfo.VERSION = payload
		}
	},
	actions: {
		async sp_admin_get_version_list({state, rootState, commit}){
			try {
				const res = await versionControlApi.sp_admin_get_version_list({state, rootState})
				commit("setVersionList", res.data.data[0]);
			} catch (e) {
				console.log(e)
			}	
		},
		// 
		async sp_admin_insert_version_info({state, rootState}){
			try {
				await versionControlApi.sp_admin_insert_version_info({state, rootState})
				location.reload()
			} catch (e) {
				console.log(e)
			}
		},
		async sp_req_b_project_list({commit}){
			try {
				const res = await versionControlApi.sp_req_b_project_list()
				commit('setProjectList', res.data.data)
			} catch(e) {
				console.log(e)
			}
		},
	},
	getters: {
		getVersionList(state){
			return state.versionList;
		},
		getChangedVersion(state){
			return state.versionInfo.VERSION;
		},
		// 현재 페이지 번호
		getPageNum(state){
			return state.searchObj.pageNum
		},
		// 마지막 페이지 번호
		getLastPageNum(state){
			return state.searchObj.lastPageNum
		},
		// 현재 검색어
		getSearch(state){
			return state.searchObj.search
		},
		getProjectList(state){
			return state.projectList
		},
	}
}