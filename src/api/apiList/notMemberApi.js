import myAxios from "@/api";

const method = "post";

export default {

	sp_admin_retrieve_prospective_site_lists({ state, rootState}) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_retrieve_prospective_site_lists";
    let data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          SEARCH: state.searchObj.search,
          OFFSET_SIZE: state.searchObj.pageOffset,
          PAGE_SIZE: state.searchObj.pageSize,
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  sp_admin_retrieve_prospective_site_info({ rootState, siteId }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_retrieve_prospective_site_info";

    let data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          SITE_ID : siteId
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  sp_admin_update_prospective_member_info({ rootState, state }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_update_prospective_member_info";

    let data = {
      params: JSON.stringify([
        {
			ADMIN_ID: userId,
			SITE_INFO: [{
				ID: state.selectedNotMember.ID,
				COMP_NAME: state.selectedNotMember.COMP_NAME,
				REP_NAME: state.selectedNotMember.REP_NAME,
				CONTACT: state.selectedNotMember.CONTACT,
				FAX: state.selectedNotMember.FAX,
				EMAIL: state.selectedNotMember.EMAIL,
				BIZ_CODE: state.selectedNotMember.BIZ_CODE,
				WEBSITE: state.selectedNotMember.WEBSITE,
				BCODE: state.selectedNotMember.BCODE,
				ADDR: state.selectedNotMember.ADDR,
				LNG: state.selectedNotMember.LNG,
				LAT: state.selectedNotMember.LAT,
				IS_TRANSIT: state.selectedNotMember.IS_TRANSIT,
				CLOSED: state.selectedNotMember.CLOSED
			}]
        },
      ]),
    };
    return myAxios(url, method, data);
  },
};
