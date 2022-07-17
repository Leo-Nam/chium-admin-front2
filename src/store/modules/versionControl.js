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
	},
	mutations: {
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
		setChangedVersionContent(state, payload){
			state.versionInfo.CONTENT = payload
		},
		setChangedVersionNew(state, payload){
			state.versionInfo.VERSION = payload
		}
	},
	actions: {
		async sp_admin_get_version_list({state, rootState, commit}){
			console.log('store:modules:versionControl.js:sp_admin_get_version_list:','hello111')
			console.log('store:modules:versionControl.js:state:',state)
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
				const res = await versionControlApi.sp_admin_insert_version_info({state, rootState})
				console.log('store:modules:versionControl.js:sp_admin_insert_version_info:',res)
				location.reload()
			} catch (e) {
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
	}
}