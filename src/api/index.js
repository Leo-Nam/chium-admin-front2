import axios from "axios";
import store from "@/store/index";
import VueCookies from "vue-cookies";
import router from "@/router";
const instance = axios.create({
  // .env 파일에 작성한 환경변수로 baseURL 설정
  baseURL: process.env.VUE_APP_API,
});

instance.interceptors.request.use(
  function (config) {
    config.headers.token = VueCookies.get("token");
    store.commit("common/getLoading");
    return config;
  },
  function (error) {
    console.log(error);
    store.commit("common/endLoading");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async function (response) {
    store.commit("common/endLoading");
    if (response.data.errcode) {
      if (response.data.errcode == "expired") {
        const res = await axios.post(
          "api/admin/common/renewalToken",
          { userId: "유저아이디" }
        );
        const token = res.data.token.token;
        VueCookies.remove("token");
        VueCookies.set("token", token, "6h");
        return;
      }
      router.push({ path: "/login" });
      VueCookies.remove("token");
      return response;
    }
    return response;
  },
  function (error) {
    store.commit("common/endLoading");
    return Promise.reject(error);
  }
);

function myAxios(url, method, data, config = null) {
	console.log("api:index.js:myAxios:",'여기여기...', url, method, data)
  if (config != null) {
	console.log("api:index.js:myAxios:",'여기여기111...', url, method, data)
    if (method == "post") {
      return instance.post(url, data, config);
    } else {
		console.log("api:index.js:myAxios:",'여기여기222...', url, method, data)
      return instance.get(url, data, config);
    }
  }
  if (method == "post") {
	console.log("api:index.js:myAxios:",'여기여기333...', url, method, data)
    return instance.post(url, data);
  } else {
	console.log("api:index.js:myAxios:",'여기여기444...', url, method, data)
    return instance.get(url, data);
  }
}

export default myAxios;
