import myAxios from "@/api";
const method = "post";

export default {
	sp_admin_get_new_comings({ state, rootState }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_get_new_comings";
    let data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          SEARCH: state.search,
          OFFSET_SIZE: state.emissionsObj.pageOffset,
          PAGE_SIZE: state.emissionsObj.pageSize,
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  sp_admin_get_new_comings_detail({ rootState, orderId }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_get_new_comings_detail";
    const data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          ORDER_ID : orderId
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  sp_admin_update_order_details({state,rootState}){
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_update_order_details";
    const data = {
      params: JSON.stringify([
        {
          USER_ID : userId,
          ORDER_DETAILS : [{
            ID : state.orderInfo.ORDER_ID,
            IS_DELETED : state.orderInfo.IS_DELETED,
            CS_CONFIRMED : state.orderInfo.CS_CONFIRMED,
          }]
        }
      ]),
    };
    return myAxios(url, method, data);

  },
  sp_get_site_list_whose_biz_areas_of_interest({rootState, bCode}){
    const userId = rootState.auth.userId;
    const url = 'api/admin/common/sp_get_site_list_whose_biz_areas_of_interest';
    const data = {
      params: JSON.stringify([
        {
          USER_ID : userId,
          B_CODE : bCode
        }
      ]),
    };
    return myAxios(url, method, data);
  },
  sp_get_site_list_inside_range({rootState, distance, lat, lng}){
    const userId = rootState.auth.userId;
    const url = 'api/admin/common/sp_get_site_list_inside_range';
    const data = {
      params: JSON.stringify([
        {
          USER_ID : userId,
          // 2 배출자, 3 수거자
          TARGET_USER_TYPE : 3,
          DISTANCE : distance,
          LAT : lat,
          LNG : lng

        }
      ]),
    };
    return myAxios(url, method, data);
  },
  sp_get_prospective_site_list_inside_range({rootState, distance, lat, lng, bCode, isTransit}){
    const userId = rootState.auth.userId;
    const url = 'api/admin/common/sp_get_prospective_site_list_inside_range';
    const data = {
      params: JSON.stringify([
        {
          USER_ID : userId,
          BCODE : bCode,
          // 2 배출자, 3 수거자
          TARGET_USER_TYPE : 3,
          DISTANCE : distance,
          IS_TRANSIT : isTransit,
          LAT : lat,
          LNG : lng

        }
      ]),
    };
    return myAxios(url, method, data);
  },
  sp_admin_get_disposer_schedule({ rootState, orderId }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_get_disposer_schedule";
    const data = {
      params: JSON.stringify([
        {
          ADMIN_ID: userId,
          ORDER_ID : orderId
        },
      ]),
    };
    return myAxios(url, method, data);
  },
};