import myAxios from "@/api";

const method = "post";

export default {

	sp_admin_get_version_list({ state, rootState }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_get_version_list";
    let data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          PROJECT_ID : state.versionInfo.PROJECT_ID,
          SEARCH: state.searchObj.search,
          OFFSET_SIZE: state.searchObj.pageOffset,
          PAGE_SIZE: state.searchObj.pageSize,
        },
      ]),
    };
	console.log('api:apiList:versionControlApi.js:sp_admin_get_version_list:', data)
    return myAxios(url, method, data);
  },
  sp_admin_insert_version_info({ rootState, state }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_insert_version_info";

    let data = {
      params: JSON.stringify([
        {
			ADMIN_ID: userId,
			DEV_INFO: [{
				PROJECT_ID: state.versionInfo.PROJECT_ID,
				CONTENT: state.versionInfo.CONTENT,
				VERSION: state.versionInfo.VERSION
			}]
        },
      ]),
    };
	console.log('api:apiList:versionControlApi.js:sp_admin_insert_version_info:',data)
    return myAxios(url, method, data);
  },

  // 유저의 인덱스의 값

};
