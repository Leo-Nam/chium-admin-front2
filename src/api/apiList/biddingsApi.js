import myAxios from "@/api";

const method = "post";

export default {
  // 로그인 할 시 인풋으로 받는 아이디 비밀번호 값
  sp_admin_get_new_biddings({ state, rootState }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_get_new_biddings";
	console.log('sp_admin_get_new_biddings started in Api')
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
  sp_admin_get_new_bidding_details({ biddingId, rootState }) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_get_new_bidding_details";
    let data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          BIDDING_ID: biddingId
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  sp_admin_update_bidding_details({state,rootState}){
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_update_bidding_details";
    let data = {
      params: JSON.stringify([
        {
          ADMIN_ID: userId,
          BIDDING_DETAILS: [{
            ORDER_VISIBLE : state.selectedBidding.ORDER_VISIBLE,
            BIDDING_VISIBLE : state.selectedBidding.BIDDING_VISIBLE,
            ID : state.selectedBidding.BIDDING_ID,
          }]
        },
      ]),
    };
    return myAxios(url, method, data);
  }


};
