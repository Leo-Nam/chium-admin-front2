<template>
  <div>
    <v-simple-table

      fixed-header
      height="300px"
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
            v-for="note,idx in noteList"
            :key="idx"
          >
            <td>{{ note.ID }}</td>
            <td>{{ note.ADMIN_NAME }}</td>
            <td>
              <a
                :href="returnUrl4(note.BIDDING_ID)"
              >
                {{ note.BIDDING_ID }}
              </a>
            </td>

            <td>
              <a
                :href="returnUrl3(note.MEMBER_ID)"
              >
                {{ note.MEMBER_NAME }}
              </a>
            </td>
            <td
              style="cursor : pointer"
              @click="showMeNote(idx)"
            >
              {{ shortenContent(note.NOTE) }}
            </td>
            <td>
              <a
                :href="returnUrl2(note.ORDER_ID)"
              >
                {{ note.ORDER_CODE }}
              </a>
            </td>
            <td>
              <a
                :href="returnUrl2(note.ORDER_ID)"
              >
                {{ note.ORDER_ID }}
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
              <a
                :href="returnUrl(note.SITE_ID, note.SITE_CATEGORY)"
              >
                {{ changeSiteName(note.SITE_NAME, note.SITE_CATEGORY) }}
              </a>
            </td>
            <td>
              <a
                :href="returnUrl6(note.TRANSACTION_ID)"
              >
                {{ note.TRANSACTION_ID }}
              </a>
            </td>
            <td>{{ getTime(note.CREATED_AT) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <NotePopup
      :dialog="dialog"
      :content="content"
      @closeDialog="closeDialog"
    />
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import NotePopup from "@/components/CommonC/NotePopup.vue"
export default {
  components : {
    NotePopup
  },
  props : {
    noteList : {
      type :  Array,
      default : ()=> [],
    },
  },
  data(){
    return {
      dialog : false,
      content : [],
      thArray : [
        '노트 번호',
        '관리자',
        '입찰 번호',

        '유저 이름',
        '내용',
        '오더 코드',
        '오더 번호',
        '처리보고서 번호',

        '사이트 이름',
        '트랜잭션 번호',
        '등록 시각'
      ]
    }
  },

  computed : {
    ...mapGetters('common',['getNotes'])
  },
  methods : {
    getTime(time){
      if (time){
        return time.slice(0,19)
      }
      return time
    },
    closeDialog(){
      this.dialog = false
    },
    showMeNote(noteIdx){
      const newArr = this.getNotes[noteIdx].NOTE.split('\n')
      this.content = newArr
      this.dialog = true
		console.log('components:commonC:NoteList.vue:showMeNote:','hello')
    },
    shortenContent(content){
      if (content !== null && content.length > 35){
         return content.slice(0,35) + '...'
      }
      return content
    },
	changeSiteName(siteName, siteCategory){
		if (siteName !== null){
			if (siteCategory === 1){
				return "(회)" + siteName
			} else {
				return "(비)" + siteName
			}
		} else {
			return ""
		}
	},
    returnUrl(siteId, siteCategory){
		if (siteCategory !== null){
			if (siteCategory === 1){
				return `/admin/main/emitter-collector/${siteId}`
			} else {
				return `/admin/main/not-member/${siteId}`
			}
		} else {
			return
		}
    },
    returnUrl2(orderId){
		if (orderId !== null){
			return `/admin/main/emissions/${orderId}`
		} else {
			return
		}
    },
    returnUrl3(userId){
		if (userId !== null){
			return `/admin/main/person-emitter/${userId}`
		} else {
			return
		}
    },
    returnUrl4(biddingId){
		if (biddingId !== null){
			return `/admin/main/biddings/${biddingId}`
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
    returnUrl6(transactionId){
		if (transactionId !== null){
			return `/admin/main/transaction/${transactionId}`
		} else {
			return
		}
    },
  }
}
</script>
<style lang="">

</style>
