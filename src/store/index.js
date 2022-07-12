import Vue from "vue";
import Vuex from "vuex";
import common from "./modules/common";
import emitterCollector from "./modules/emitterCollector";
import auth from "./modules/auth";
import chart from "./modules/chart";
import selectedUser from "./modules/selectedUser";
import emissions from "./modules/emissions";
import biddings from "./modules/biddings";
import transaction from "./modules/transaction";
import report from "./modules/report";
import log from "./modules/log";
import notMember from "./modules/notMember";
import noteList from "./modules/noteList";
import questionList from "./modules/questionList";
import addAdmin from "./modules/addAdmin";
import versionControl from "./modules/versionControl";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false }); // 브라우저의 application local storage에 표시되는 경우 암호와 되어 해독이 불가능하도록 조치하게 됨

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["auth", "selectedUser", "common"],		//여기에 모듈을 등록하게 되면 프론트 화면을 새로고침을 하더라도 자료가 남는다. 로컬스토리지에 저장하게 됨, 여기에 등록되지 않은 자료는 새로고침시 사라지게 됨
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
  modules: {
    chart,
    common,
    emitterCollector,
    selectedUser,
    auth,
    emissions,
    biddings,
    transaction,
    report,
    log,
    notMember,
	noteList,
	questionList,
	addAdmin,
	versionControl
  },
});
