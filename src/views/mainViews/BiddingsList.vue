
<template>
  <div>
    <v-row style="margin-top : 10px">
      <v-col

        :md="6"
        cols="12"
        style="margin-bottom : 10px;"
      >
        <BiddingsSearchBar />
      </v-col>
    </v-row>

    <BiddingsTable />
    <BiddingsNav />
  </div>
</template>
<script>
import BiddingsNav from "@/components/BiddingsListC/BiddingsNav.vue"
import BiddingsSearchBar from "@/components/BiddingsListC/BiddingsSearchBar.vue"
import BiddingsTable from "@/components/BiddingsListC/BiddingsTable.vue"

import {mapActions,mapMutations} from "vuex"
export default {

  components : {
    BiddingsTable,BiddingsSearchBar,BiddingsNav
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
    ...mapMutations('biddings',['setPageNum','setSearch']),
    ...mapActions('biddings',['sp_admin_get_new_biddings']),

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
      this.sp_admin_get_new_biddings()

    }
  },


}
</script>
<style lang="">

</style>
