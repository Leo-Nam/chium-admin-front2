import myAxios from "@/api";

const method = "post";

export default {
	sp_admin_retrieve_stat_registeration({ state, rootState }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_retrieve_stat_registeration";
    const data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          PARAM_YEAR: state.calendarBar.nowYear,
          PARAM_MONTH: state.calendarBar.nowMonth,
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  sp_req_sido({ rootState }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_req_sido";
    let data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          REGION_CODE: null,
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  sp_admin_retrieve_stat_region({ rootState, state }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_retrieve_stat_region";
    let data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          REGION_CODE: state.sidoBar.regionCode,
        },
      ]),
    };
    return myAxios(url, method, data);
  },
};
