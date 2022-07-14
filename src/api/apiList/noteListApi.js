import myAxios from "@/api";

const method = "post";

export default {

	sp_admin_get_note_lists({rootState, state}) {
		const userId = rootState.auth.userId;
		const search = state.search;
		const offsetSize = state.offsetSize;
		const pageSize = state.pageSize;
		const url = "api/admin/common/sp_admin_get_note_lists";
		let data = {
			params: JSON.stringify([
				{
					USER_ID: userId,
					SEARCH: search,
					OFFSET_SIZE: offsetSize,
					PAGE_SIZE: pageSize,
				},
			]),
		};
		return myAxios(url, method, data);
	},

	sp_admin_get_note_details({rootState, payload}) {
		const userId = rootState.auth.userId;
		const noteId = payload.noteId;
		console.log('api:apiList:noteListApi.js:sp_admin_get_note_details:', userId, noteId)
		const url = "api/admin/common/sp_admin_get_note_details";
		let data = {
			params: JSON.stringify([
				{
					USER_ID: userId,
					NOTE_ID: noteId
				},
			]),
		};
		return myAxios(url, method, data);
	},

	sp_admin_update_note({rootState, state}) {
		const userId = rootState.auth.userId;
		const noteDetails = state.selectedNote;
		console.log('api:apiList:noteListApi.js:sp_admin_update_note:', userId, noteDetails)
		const url = "api/admin/common/sp_admin_update_note";
		let data = {
			params: JSON.stringify([
				{
					USER_ID: userId,
					NOTE_DETAILS: [{
						ID: noteDetails.ID,
						NOTE: noteDetails.NOTE
					}]
				},
			]),
		};
		console.log('api:apiList:noteListApi.js:sp_admin_update_note:', data, 'data.......')
		return myAxios(url, method, data);
	},

  // 유저의 인덱스의 값

};
