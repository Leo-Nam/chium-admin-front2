import notMemberApi from "@/api/apiList/notMemberApi";
import myAxios from "@/api";

export default {
  namespaced: true,
  state: {
    searchObj : {
      pageOffset: 0,
      pageSize: 15,
      pageNum: 1,
      lastPageNum: 10,
      search: null,
    },
    // 선택된 비회원 정보
    selectedNotMember : {},
    // 비회원 리스트
    notMemberList: [],
    // 폐기물 허가영업 종류
    trmtBiz: [],
	// 선택된 허가영업에 대한 CODE
	selectedBizCode: null
  },
  mutations: {
    // 주소 변경
	setProspectiveMemberInfo(state, { key, value }) {
		if (value == ''){
			state.selectedNotMember[key] = null;
			console.log('store:modules:notMembers.js:setProspectiveMemberInfo:','1 >>>', state.selectedNotMember[key])
		} else {
			state.selectedNotMember[key] = value;
			console.log('store:modules:notMembers.js:setProspectiveMemberInfo:','2 >>>', state.selectedNotMember[key])
		}
	},
    setAddr(state, payload) {
      state.selectedNotMember.ADDR = payload.ADDR;
      state.selectedNotMember.BCODE = payload.BCODE;
      state.selectedNotMember.LAT = payload.LAT;
      state.selectedNotMember.LNG = payload.LNG;
    },
	setSelectedBizCode(state, payload){
		state.selectedNotMember.BIZ_CODE = payload.BIZ_CODE
		state.selectedNotMember.BIZ_NAME = payload.BIZ_NAME
	},
    // 폐기물 허가영업 종류(배출자 포함)
    setTrmtBizLists(state, payload) {
      state.trmtBiz = payload.trmtBiz;
    },
	// 비회원사 리스트 설정
	setNotMemberList(state,payload){
	if (payload) {
		state.notMemberList = payload.SITE_LISTS;
		state.searchObj.lastPageNum = Number(payload.LAST_PAGE);
	} else {
		// 비어있다면 초기화 시켜준다.
		state.notMemberList = [];
		state.searchObj.lastPageNum = 0;
	}
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
	// 검색어 저장
	setSearch(state, payload) {
		state.searchObj.search = payload;
	},
	// 비회원사 디테일 저장
	setNotMemberDetail(state,payload){
		// // 보여주지 않을 키워드
		// const uselessKeys = [
		// 	'BCODE',
		// 	'BIZ_CODE',
		// 	'LAT',
		// 	'LNG',
		// ]
		// // 삭제하고
		// uselessKeys.forEach( (v) => {
		// 	delete payload[v]
		// })
		// // 저장
		state.selectedNotMember = payload
	},
	// 비회원사 수정사항
	changeSelectedNotMember(state,{key,value}){
		state.selectedNotMember[key] = value
	}
  },
  actions: {
    // 폐기물 리스트 받아오는 api
    async sp_req_b_trmt_biz({ commit }) {
      const method = "post";
      const url = "api/admin/common/sp_req_b_trmt_biz";
      let trmtBiz
      try {
        trmtBiz = await myAxios(url, method);
      } catch (e) {
        console.log(e)
      }
      commit("setTrmtBizLists", { trmtBiz: trmtBiz.data.data });
    },
    // 비회원사 리스트
    async sp_admin_retrieve_prospective_site_lists({state,rootState,commit}){
      try {
        const res = await notMemberApi.sp_admin_retrieve_prospective_site_lists({state, rootState})

        commit("setNotMemberList", res.data.data[0]);
      } catch (e) {
        console.log(e)
      }
    },
    // 비회원사 디테일
    async sp_admin_retrieve_prospective_site_info({rootState,commit},{siteId}){
      try {
        const res = await notMemberApi.sp_admin_retrieve_prospective_site_info({rootState,siteId})
        commit("setNotMemberDetail", res.data.data[0].SITE_INFO[0]);
        commit("common/setNotes", res.data.data[0].NOTES.NOTES, { root : true });
      } catch (e) {
        console.log(e)
      }
    },
    async sp_admin_update_prospective_member_info({state, rootState}){
      try {
		console.log('store:modules:notMembers.js:sp_admin_update_prospective_member_info:','hello')
        await notMemberApi.sp_admin_update_prospective_member_info({state, rootState})
        //location.reload()
      } catch (e) {
        console.log(e)
      }
    },
  },
  getters: {
     // 비회원사 리스트
     getNotMemberList(state){
      return state.notMemberList;
    },
    // 비회원사 디테일
    getNotMemberDetail(state){
      return state.selectedNotMember
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
    // 현재 검색어
    getTrmtBiz(state){
      return state.trmtBiz
    },
    // 현재 검색어
    getSelectedBiz(state){
      return {'BIZ_CODE': state.selectedNotMember.BIZ_CODE, 'BIZ_NAME': state.selectedNotMember.BIZ_NAME}
    },
  },
};

