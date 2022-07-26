import noteListApi from "@/api/apiList/noteListApi"

export default {
	namespaced: true,
	state: {
		search : null,
		offsetSize : 0,
		pageSize : 15,
		lastPage : 10,
		noteList : [],
		pageNum: 1,
		// 선택된 노트 정보(details)
		selectedNote : {},
		s3Img: {
			components: {
				checkOn: {
					src: 'https://chium-admin.s3.ap-northeast-2.amazonaws.com/images/admin-1658029718.png',
					width: 20
				},
				checkOff: {
					src: 'https://chium-admin.s3.ap-northeast-2.amazonaws.com/images/admin-1658029940.png',
					width: 20
				}			
			}
		},
		pageConfig: {
			search: {},
			table: {},
			emoji: {},
		}
	},
	mutations: {
		setSearchConfig(state, payload){
			state.pageConfig.search = payload.spec
		},
		setTableConfig(state, payload){
			state.pageConfig.table = payload
		},
		setEmoji(state, payload){
			state.pageConfig.emoji = payload
		},
		// state값을 변경하기 위해서는 mutations를 거쳐야 함
		setNoteLists(state, payload){
			state.noteList = payload
		},
		setLastPage(state, payload){
			state.lastPage = payload
		},
		setSearch(state, payload){
			state.search = payload
		},
		setPageNum(state, payload){
			state.pageNum = payload,
			state.offsetSize = (state.pageNum - 1) * state.pageSize
		},
		setNoteDetails(state, payload){
			state.selectedNote = payload
		},
		changeSelectedNote(state,{key,value}){
		state.selectedNote[key] = value
		}
	},
	actions: {
		async sp_admin_get_note_lists({rootState, state, commit}){
			const res = await noteListApi.sp_admin_get_note_lists({rootState, state})
			
			commit("setNoteLists", res.data.data[0].NOTE_LIST)	
			commit("setLastPage", res.data.data[0].LAST_PAGE)	
		},
		async sp_admin_get_note_details({rootState, commit}, payload){
			const res = await noteListApi.sp_admin_get_note_details({rootState, payload})
			commit("setNoteDetails", res.data.data[0].NOTE_DETAILS[0])
		},
		async sp_admin_update_note({rootState, state}){
			try{
				await noteListApi.sp_admin_update_note({rootState, state})
			} catch(e){
				console.log(e)
			}
		}
		
	},
	getters: {
		getNoteLists(state){
			return state.noteList
		}, 
		getPageNum(state){
			return state.pageNum
		}, 
		getLastPageNum(state){
			return state.lastPage
		}, 
		getSearch(state){
			return state.search
		},
		// 상담내역 디테일
		getNoteDetail(state){
			return state.selectedNote
		},
		getS3Img(state){
			return state.s3Img
		},
		getEmoji(state){
			return state.pageConfig.emoji
		},
		getSearchConfig(state){
			return state.pageConfig.search		
		},
		getTableConfig(state){
			return state.pageConfig.table		
		},
	},
};

