<template>
  <div>
    <v-card-title>
      입찰 정보
    </v-card-title>

    <v-simple-table
      fixed-header
    >
      <template #default>
        <thead>
          <tr>
            <th
              v-for="th,idx in biddingTh"
              :key="th+idx"
              class="text-left"
            >
              {{ th }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="bidding,idx in getBiddingInfo"
            :key="idx"
            style="cursor : pointer"
            @click="goToContent(bidding.COLLECTOR_BIDDING_ID)"
          >
            <td>{{ bidding.COLLECTOR_BIDDING_ID }}</td>
            <td>{{ bidding.COLLECTOR_SITE_NAME }}</td>
            <td>{{ bidding.COLLECTOR_PHONE }}</td>
            <td>{{ bidding.COLLECTOR_SI_DO }}</td>
            <td>{{ bidding.COLLECTOR_SI_GUN_GU }}</td>
            <td>{{ bidding.COLLECTOR_STATE }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  data(){
    return {
      biddingTh : [
        'ID',
        '사이트',
        '연락처',
        '시도',
        '시군구',
        '상태',
      ]
    }
  },
  computed : {
    ...mapGetters('emissions',['getBiddingInfo'])
  },
  methods : {
    getTime(time){
      return time.slice(0,19)
    },
    goToContent(biddingId){
       this.$router.push({ path: `/admin/main/biddings/${biddingId}`})
    },
  }
}
</script>
<style lang="">

</style>
