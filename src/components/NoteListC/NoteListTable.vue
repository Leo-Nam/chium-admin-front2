<template>
<div>
	<v-card-title>
		상담내역
	</v-card-title>
  <v-simple-table

    fixed-header
    height="700px"
  >
    <template #default>
      <thead>
        <tr>
          <th
            v-for="th,idx in thArray"
            :key="idx"
          >
            {{ th }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="note,idx in getNoteLists"
          :key="idx"
          style="cursor : pointer"
        >
          <td>
            <a
              :href="returnUrl2(note.ID)"
            >
              {{ note.ID }}
            </a>
          </td>
          <td>{{ note.ADMIN_NAME }}</td>
          <td>
            <a
              :href="returnUrl1(note.ORDER_ID)"
            >
              {{ note.ORDER_CODE }}
            </a>
          </td>
          <td>
            <a
              :href="returnUrl3(note.BIDDING_ID)"
            >
              {{ note.BIDDING_ID }}
            </a>
          </td>
          <td>
            <a
              :href="returnUrl4(note.TRANSACTION_ID)"
            >
              {{ note.TRANSACTION_ID }}
            </a>
          </td>
          <td>
            <a
              :href="returnUrl5(note.REPORT_ID)"
            >
              {{ note.REPORT_ID }}
            </a>
          </td>
          <td> 
            <div v-if="note.SITE_ID !== null">
              <div v-if="note.SITE_CATEGORY === 0">
                <a
                  :href="returnUrl8(note.SITE_ID)"
                >
                  {{ note.SITE_ID }}
                </a>
              </div>
              <div v-else>
                <a
                  :href="returnUrl6(note.SITE_ID)"
                >
                  {{ note.SITE_ID }}
                </a>
              </div>
            </div>
          </td>
          <td>
            <a
              :href="returnUrl7(note.MEMBER_ID)"
            >
              {{ note.MEMBER_ID }}
            </a>
          </td>
          <td>{{ getTime(note.CREATED_AT) }}</td>
          <td>{{ shortenContent(note.NOTE) }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

</div>
</template>
<script>
import {mapGetters, mapMutations} from "vuex"
export default {
  data(){
    return {
      thArray : [
        'ID',
        '관리자이름',
        '폐기물등록번호',
        '입찰 번호',
        '트랜잭션 번호',
        '리포트 번호',
        '사이트 이름',
        '회원 아이디',
        '생성 일자',
        '상담내용',
        ]
    }
  },
  computed : {
    ...mapGetters('noteList',['getNoteLists'])
  },
	created(){
		this.setCurrentRoute(this.$route.name)
		console.log('this.$route>>>>', this.$route)
	},
  methods : {
	...mapMutations('common',['setCurrentRoute']),
    getTime(time){
      if (time){
        return time.slice(0,19)
      }
      return time
    },

    changeBoolToEmoji(bool){
      return bool ? '✅' : '❌'
    },

    shortenContent(content){
      if (content !== null && content.length > 35){
         return content.slice(0,35) + '...'
      }
      return content

    },
    goToSomeWhere({value,key}){

      if (key === 'ID'){
        this.$router.push(`./${value}`)
        return
      }
    },
    returnUrl1(orderId){
		if (orderId !== null){
			return `/admin/main/emissions/${orderId}`
		} else {
			return
		}
    },
    returnUrl2(noteId){
		if (noteId !== null){
			return `/admin/main/note-list/${noteId}`
		} else {
			return
		}
    },
    returnUrl3(biddingId){
		if (biddingId !== null){
			return `/admin/main/biddings/${biddingId}`
		} else {
			return
		}
    },
    returnUrl4(transactionId){
		if (transactionId !== null){
			return `/admin/main/transaction/${transactionId}`
		} else {
			return
		}
    },
    returnUrl5(reportId){
		if (reportId !== null){
			return `/admin/main/report/${reportId}`
		} else {
			return
		}
    },
    returnUrl6(siteId){
		if (siteId !== null){
			return `/admin/main/emitter-collector/${siteId}`
		} else {
			return
		}
    },
    returnUrl7(memberId){
		if (memberId !== null){
			return `/admin/main/person-emitter/${memberId}`
		} else {
			return
		}
    },
    returnUrl8(siteId){
		if (siteId !== null){
			return `/admin/main/not-member/${siteId}`
		} else {
			return
		}
    },
  }



}
</script>
<style lang="">

</style>
