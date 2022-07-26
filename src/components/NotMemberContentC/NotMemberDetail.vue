<template>
  <div>
    <v-row
      justify="end"
      style="margin-bottom : 30px"
    >
      <v-col
        cols="auto"
      >
        <v-btn @click="modify">
          수정하기
        </v-btn>
      </v-col>
    </v-row>
    <v-sheet>
      <v-card style="padding : 40px">
        <v-card-title>
          비회원사 상세 내역
        </v-card-title>

        <v-row>
          <v-col
            v-for="value, key in getNotMemberDetail"
            :key="key"
            cols="12"
            md="6"
            lg="6"
          >
            <v-row>
              <v-col cols="auto">
                {{ englishToKorean(key) }} :
              </v-col>
              <v-col 
                cols="auto" 
              >
                <div v-if="key == 'BIZ_NAME'">
                  <TrmtBizList />
                </div>
                <div v-else-if="key == 'FAX' || key == 'CONTACT' || key == 'EMAIL' || key == 'BIZ_NAME' || key == 'COMP_NAME' || key == 'WEBSITE' || key == 'REP_NAME'">
                  <v-text-field
                    dense
                    :value="changeValue(value,key)"
                    @input="MyVmodel(key,$event)"
                  />
                </div>
                <div v-else-if="key == 'CLOSED' || key == 'IS_TRANSIT'">
                  <input
                    :id="key"
                    class="checked-box"
                    type="checkbox"
                    :checked="value ? true : false"
                    @click="changeActive(key,value)"
                  >
                </div>
                <div v-else>
                  {{ changeValue(value,key) }}
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-sheet>
    <v-card style="margin-top : 50px;">
      <v-card-title>
        노트
      </v-card-title>
      <NoteInput
        :site-id="getNotMemberDetail.ID"
        :site-category="0"
      />
      <NoteList
        v-if="getNotes"
        :note-list="getNotes"
      />
    </v-card>
  </div>
</template>
<script>
import NoteInput from "@/components/CommonC/NoteInput.vue"
import NoteList from "@/components/CommonC/NoteList.vue"
import TrmtBizList from "@/components/NotMemberContentC/TrmtBizList.vue"
import {mapGetters, mapMutations, mapActions} from "vuex"
export default {
	components : {
		NoteInput,
		NoteList,
		TrmtBizList
	},
	data(){
		return {
			englishToKoreanObj : {
				ADDR: '주소',
				BCODE: 'BCODE',
				BIZ_CODE: '업종코드',
				BIZ_NAME: '업종',
				CLOSED: '폐업여부',
				COMP_NAME: '회사명',
				CONTACT: '전화번호',
				EMAIL: '이메일',
				FAX: '팩스번호',
				ID: '등록번호' ,
				IS_TRANSIT: '수집운반',
				LAT: '위도',
				LNG: '경도',
				REP_NAME: '대표자',
				WEBSITE: '웹사이트',
			},
			canChangeArray : ['BIDDING_VISIBLE','ORDER_VISIBLE'],
			orderId : null,
			biddingId : null,
			addrInfo : {}
		}
	},
  
	computed : {
		...mapGetters('notMember',['getNotMemberDetail']),
		...mapGetters('common',['getNotes']),
	},

	watch : {
		getBiddingDetails(to){
		this.orderId = to.ORDER_INFO[0].ID
		this.biddingId = to.BIDDING_ID
		}
	},

	methods : {
		...mapMutations('common',['resetNotes']),
		...mapMutations('notMember',['setAddr', 'setProspectiveMemberInfo']),
		...mapActions('notMember',['sp_admin_update_prospective_member_info']),
		changeActive(key){
			const el = document.getElementById(key)
			const value = el.checked === true ? true : false
			this.MyVmodel(key,value)
		},
		modify(){
			this.sp_admin_update_prospective_member_info()
		},

		MyVmodel(key,value){
			this.setProspectiveMemberInfo({key,value})
		},

		englishToKorean(key){
		return this.englishToKoreanObj[key]
		},

		changeValue(value,key){
		if (key === 'IS_TRANSIT'){
			if(value === 1) {
			return '가능'
			}
			return '불가능'
		} else if(key === 'CLOSED'){
			if(value === 1) {
			return '영업중'
			}
			return '폐업'
		}
		return value
		},

		getTime(time){
		return time.slice(0,19)
		},

		returnUrl(value,key){
		if (key === 'ORDER_INFO'){
			return `/admin/main/emissions/${value[0].ID}`
		} else if (key === 'COLLECTOR_ID') {
			return `/admin/main/emitter-collector/${value}`
		}
		},

		changeState(value,key){
		if (this.canChangeArray.indexOf(key) > -1){
			if (value === 0) value = 1
			else if (value ===1 ) value = 0
			this.changeBiddingDetail({value,key})
		}
		},
		addrChange(){
		// eslint-disable-next-line no-undef
			new daum.Postcode({
				oncomplete: (data) => {
					let fullRoadAddr = data.roadAddress; // 도로명 주소 변수
					let extraRoadAddr = ''; // 도로명 조합형 주소 변수
					// 법정동명이 있을 경우 추가한다. (법정리는 제외)
					// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
					if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
						extraRoadAddr += data.bname;
					} // 건물명이 있고, 공동주택일 경우 추가한다.
					if(data.buildingName !== '' && data.apartment === 'Y'){
						extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
					} // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
					if(extraRoadAddr !== ''){
						extraRoadAddr = ' (' + extraRoadAddr + ')';
					} // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
					if(fullRoadAddr !== ''){ 
						fullRoadAddr += extraRoadAddr;
					} // 우편번호와 주소 정보를 해당 필드에 넣는다.

					Promise.resolve(data).then(()=>{
					return new Promise((resolve,reject)=>{
						const geocoder = new window.kakao.maps.services.Geocoder();
						geocoder.addressSearch(fullRoadAddr,(result,status)=>{
						if(status === window.kakao.maps.services.Status.OK){
							const { x, y } = result[0];
							resolve({ lat: y, log: x })
						}else{
							reject();
						}
						})
					})
					}).then(result => {
						let lat = parseFloat(result.lat)
						let lng = parseFloat(result.lng)
						this.addrInfo = { ADDR: data.address+', ', BCODE: data.bcode, LAT: lat, LNG: lng }
						this.setAddr(this.addrInfo)
					})

				},
				animation : true,
				onclose: (state) => {
					if(state === 'COMPLETE_CLOSE') alert('상세 주소를 뒤에 이어서 적어주세요!')
					const el = document.getElementById('ADDR')
					el.readOnly = false
					el.focus()
				},

			}).open();
		},
	}
}
</script>
<style>
</style>