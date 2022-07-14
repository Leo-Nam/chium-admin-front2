import VueCookies from "vue-cookies";
import router from "@/router";
import cloneDeep from "lodash/cloneDeep";
import authApi from "@/api/apiList/authApi"

// 기본 어드민 유저의 정보
const INITIAL_STATE = {
  // 인덱스 아이디값
  userId: null,
  // 권한 클래스 값
  class: null,
  userInit : false
};

export default {
  namespaced: true,
//   state: cloneDeep(INITIAL_STATE),
	state: {
		// 인덱스 아이디값
		userId: null,
		// 권한 클래스 값
		class: null,
		userInit : false,
		loginInfo: {
			adminId : null,
			adminPw : null,
			adminPw2 : null
		}
	},
  mutations: {
    // 로그인 한 어드민 유저 설정
	setUser(state, { userId, classNum, userInit }) {
		state.userId = userId
		state.class = classNum
		state.userInit = userInit
	},
    // 로그아웃
    logout(state) {
      // 쿠키에서 토큰제거 후 vuex의 userId, class 초기화
      VueCookies.remove("token");
    //   location.reload()
      Object.assign(state, cloneDeep(INITIAL_STATE));
    },
	setUserItem(state, { key, payload }){
		state.loginInfo[key] = payload
	},
	setUserInitSucess(state){
		state.userInit = true
	}

  },
  actions: {
    // 로그인
    async login({ commit }, { adminId, adminPw }) {
      let res
		console.log('1')
      try{
		console.log('2')
        res = await authApi.login({adminId,adminPw});
		console.log('res>>>', res)
      }catch(e){
        console.log(e)
      }
		console.log('3')
		console.log('res.data.data', res.data.data)
		console.log('res.data.message', res.data.message)
		console.log('res.data.state', res.data.state)
      const state = res.data.state;
		console.log('4')
		let userInit = false;
      if (state == 100001) {
        alert("아이디가 존재하지 않습니다.");
        return;
      }else if (res.data.message == 'password not match') {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }else {
		console.log('5')
		const getData = JSON.parse(res.data.data);
		console.log('getData >>>>>>>>>>>>', getData)
		const userId = getData.ID;
		const classNum = getData.CLASS;
		if (state == 0 && adminPw =='1234'){
			userInit = true		
			commit("setUser", { userId, classNum, userInit });
		}
      // 로그인 성공시 받아온 토큰 값을 쿠키에 저장
      const token = res.data.token.token;
      VueCookies.set("token", token, "6h");
      // 아이디 값과 권한 클래스값 저장
		if(userInit === false){
			commit("setUser", { userId, classNum, userInit });
			// 화면 이동
			router.push({ path: "/admin/main/emitter-collector" });
		}
		console.log('6')
		}
    },

    async sp_admin_init_user({state, commit}) {
      let res
      try{
		console.log('state.loginInfo>>>', state.loginInfo)
        res = await authApi.sp_admin_init_user({
			adminId: state.userId, 
			adminUid: state.loginInfo.adminId, 
			adminPw: state.loginInfo.adminPw, 
		});
		console.log('res0987>>>', res)
      }catch(e){
		console.log(e)
      }
      const status = res.data.state;
    //   const getData = res.data.data;
		console.log('res >>>>>>>>>>>>', res)
    //   const userId = getData.ADMIN_ID;
    //   const classNum = getData.CLASS;
	// 	let userInit = false;
      if (status > 0) {
        alert("사용자정보수정에 실패하였습니다. 관리자에게 문의하시기 바랍니다.");
        return;
      } else {
		// 로그인 성공시 받아온 토큰 값을 쿠키에 저장
		const token = res.data.token.token;
		VueCookies.set("token", token, "6h");
		// 아이디 값과 권한 클래스값 저장
		commit("setUserInitSucess");
		// 화면 이동
		router.push({ path: "/admin/main/emitter-collector" });
		}
    },
  },
  getters: {
    getUserClass(state) {
      // 현재의 유저 클래스에 따라 관리자의 이름이 다르게 보이도록 설정
      if (state.class == null) {
        return "로그인을 해주세요.";
      } else if (state.class == 101) {
        return "총괄 관리자";
      }
      return "일반 관리자";
    },
    // 로그인 했는지 여부를 userId값으로 판단
    isLogged(state) {
      if (state.userId) {
        return true;
      }
      return false;
    },
    // 클래스 권한 값을 통하여 권한 판단
    canYouComeHere1(state) {
      if (state.class == 101) {
        return true;
      }
      return false;
    },
    getUserId(state){
      return state.userId
    },
    getUserClassId(state) {
      return state.class
    },
    getUserInit(state) {
      return state.userInit
    },
  },
};

