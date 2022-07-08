
<template>
  <div>
    <v-row style="margin-top : 10px">
      <v-col

        :md="6"
        cols="12"
        style="margin-bottom : 10px;"
      >
        <EmissionsSearchBar />
      </v-col>
    </v-row>

    <EmissionsTable />
    <EmissionsNav />
  </div>
</template>
<script>
import EmissionsNav from "@/components/EmissionsListViewC/EmissionsNav.vue"
import EmissionsSearchBar from "@/components/EmissionsListViewC/EmissionsSearchBar.vue"
import EmissionsTable from "@/components/EmissionsListViewC/EmissionsTable.vue"

import {mapActions,mapMutations} from "vuex"
  if (window.EventSource) {
    var source = new EventSource('http://192.168.0.46:3000/admin/main/server_notification')
	console.log("source >>>>>>>>", source)
    source.addEventListener('message', function(e) {
    //   document.getElementById('data').innerHTML = e.data
      console.log(e.data)
    }, false)

    source.addEventListener('open', function(e) {
    //   document.getElementById('state').innerHTML = "Connected" + e.data
      console.log("Connected", e.data)
    }, false)

    // source.addEventListener('error', function(e) {
    //   const id_state = document.getElementById('state')
    //   if (e.eventPhase == EventSource.CLOSED)
    //     source.close()
    //   if (e.target.readyState == EventSource.CLOSED) {
    //     id_state.innerHTML = "Disconnected"
    //   }
    //   else if (e.target.readyState == EventSource.CONNECTING) {
    //     id_state.innerHTML = "Connecting..."
    //   }
    // }, false)
  } else {
    console.log("Your browser doesn't support SSE")
  }

export default {

  components : {
    EmissionsTable,EmissionsSearchBar,EmissionsNav
  },

  watch: {
    $route(to) {
      // 네비게이션에서 버튼을 눌렀을 경우에 그 파라미터 값을 받아와서
      // 페이지번호 를 받아온 값으로 바꾸고 데이터들을 불러옴
      // 페이지 번호를 Number로 바꿔준다. 만약 아무 값이 없다면 NaN이 나오니까 아래에서 1로 바꿔주는 작업을 진행
      this.controlQuerySetAndGetPermitList(to)
    }
  },
  created(){
    //created와 watch가 동시에 실행될 일은 없다.✅
    // 처음에 permit2로 들어오게되면 실행이 된다.
    // 처음엔 query params가 없기에 1로 지정해주는 작업을 하고,
    // 임의로 query params를 넣은 경우에 그 번호를 현재번호로 바꿔준 뒤에
    // 데이터를 불러온다.
    this.controlQuerySetAndGetPermitList(this.$route)

  },

  methods : {
    ...mapMutations('emissions',['setPageNum','setSearch']),
    ...mapActions('emissions',['sp_admin_get_new_comings']),

    async controlQuerySetAndGetPermitList(querySet){
      let pageToGo = Number(querySet.query.page)

      let searchKeyword = querySet.query.keyword

      if (querySet.query.page == undefined){
        pageToGo = 1
      }
      // keyword가 없다면 null로 바꿔줌
      if (searchKeyword == undefined){
        searchKeyword = null
      }

      // 라우터 쿼리에 담긴 값으로 검색 시작
      this.setSearch(searchKeyword)
      this.setPageNum(pageToGo)
      this.sp_admin_get_new_comings()
      //this.server_notification()
		console.log('server_notification is running!!')

    }
  },


}
</script>
<style lang="">

</style>
