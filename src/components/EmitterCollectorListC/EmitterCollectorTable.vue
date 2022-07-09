<template>
  <v-simple-table
    dense
    fixed-header
    height="600px"
  >
    <template #default>
      <thead>
        <tr>
          <th 
            v-for="th in headers"
            :key="th"
            class="text-left"
          >
            {{ th }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item,idx in getEmitterCollectorList"
          :key="idx"
          style="cursor : pointer"
          @click="goToContent(item.SITE_ID)"
        >
          <td>{{ item.SITE_ID }}</td>
          <td>{{ checkEmOrCol(item.SITE_INFO[0].TRMT_BIZ_CODE) }} </td>
          <td>{{ item.SITE_NAME }}</td>
          <td>{{ item.COMPANY_INFO[0].BIZ_REG_CODE }}</td>
          <td>{{ getTime(item.CREATED_AT) }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import {mapGetters} from "vuex"
export default {
	data(){
		return{
			headers: ['ID', '구분', '사이트 이름', '사업자 등록 번호', '등록일자']
		}
	},
  computed : {
    ...mapGetters('emitterCollector',['getEmitterCollectorList'])
  },
  methods : {
    getTime(time){
      return time.slice(0,19)
    },
    goToContent(siteId){
       this.$router.push({ path: `emitter-collector/${siteId}`})
    },
    checkEmOrCol(code){
      if (Number(code) == 9){
        return '배출자'
      }
      return '수거자'
    },
  }



}
</script>
<style lang="">

</style>
