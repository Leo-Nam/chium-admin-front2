<template>
  <v-simple-table

    fixed-header
    height="700px"
  >
    <template #default>
      <thead>
        <tr>
          <th class="text-left">
            ORDER ID
          </th>
          <th class="text-left">
            ORDER CODE
          </th>
          <th class="text-left">
            구분
          </th>
          <th class="text-left">
            배출자 이름
          </th>
          <th class="text-left">
            주소
          </th>
          <th class="text-left">
            등록일자
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item,idx in getEmissionsList"
          :key="idx"
          style="cursor : pointer"
          @click="goToContent(item.ORDER_ID)"
        >
          <td>{{ item.ORDER_ID }}</td>
          <td>{{ item.ORDER_CODE }}</td>
          <td>{{ item.DISPOSER_TYPE }}</td>
          <td>{{ item.DISPOSER_NAME }}</td>
          <td>{{ item.ADDR }}</td>
          <td>{{ getTime(item.CREATED_AT) }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  computed : {
    ...mapGetters('emissions',['getEmissionsList'])
  },
  created(){
    //created와 watch가 동시에 실행될 일은 없다.✅
    // 처음에 permit2로 들어오게되면 실행이 된다.
    // 처음엔 query params가 없기에 1로 지정해주는 작업을 하고,
    // 임의로 query params를 넣은 경우에 그 번호를 현재번호로 바꿔준 뒤에
    // 데이터를 불러온다.

  },
  methods : {
	// handleBan(banMessage){
	// 	this.messages.push(`You're been banned! Reason: ${banMessage.reason}`)
	// },
	// handleChat(message){
	// 	this.messages.push(`${message.user} said: ${message.text}`)
	// },
	// handleMessage(message){
	// 	console.warn('Received a mesage w/o an event!', message)
	// },
	
    getTime(time){
      return time.slice(0,19)
    },
    goToContent(siteId){
       this.$router.push({ path: `./${siteId}`})
    },
  }
}
</script>
<style lang="">

</style>
