<template>
  <v-container
    fluid
    style="margin-top : 100px;"
  >
    <v-card style="padding : 40px; width : 50%; margin : 0 auto; ">
      <h2>직원 추가</h2>
      <v-row>
        <v-col
          cols="3"
        >
          <v-subheader class="text-center">
            이름
          </v-subheader>
        </v-col>

        <v-col>
          <v-text-field
            solo
            hide-details=""
			@input="changeState('name',$event)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="3"
        >
          <v-subheader class="text-center">
            전화번호
          </v-subheader>
        </v-col>

        <v-col>
          <v-text-field
            solo
            hide-details=""
			@input="changeState('phone',$event)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="3"
        >
          <v-subheader class="text-center">
            암호
          </v-subheader>
        </v-col>
        <v-col>
          암호는 초기값 1234로 입력됩니다. 직원이 최초 로그인시에 변경하여야 합니다.
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="3"
        >
          <v-subheader class="text-center">
            권한
          </v-subheader>
        </v-col>
        <v-col>
          <v-autocomplete
            placeholder="101~103"
            solo
            hide-details=""
			:items="classCode"
            @change="changeState('classCode',$event)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="3"
        >
          <v-subheader class="text-center">
            부서
          </v-subheader>
        </v-col>
        <v-col>
          <v-autocomplete
            solo
            hide-details=""
            :items="getDepartment"
			@change="changeState('department',$event)"
          />
        </v-col>
      </v-row>

      <v-row justify="end">
        <v-col cols="auto">
          <v-btn @click="sp_admin_insert_manager">
            완료 🚀
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import {mapGetters, mapActions, mapMutations} from "vuex"
export default {
	
	data(){
		return{
			classCode: [101, 102, 103],
		}
	},
	computed : {
		...mapGetters('addAdmin',['getDepartment', 'getTitle'])
	},
	created(){
		this.sp_req_b_department()
		this.setCurrentRoute(this.$route.name)
		console.log('this.$route>>>>', this.$route)
	},
	methods: {
		...mapActions('addAdmin',['sp_req_b_department', 'sp_admin_insert_manager']),
		...mapMutations('addAdmin',['changeAdminDetail', 'setDepartmentItem']),
		...mapMutations('common',['setCurrentRoute']),

		changeState(key,value){
			console.log('components:addAdminC:addAdminForm.vue:changeState:',value,key)
			if(key === 'department'){
				this.setDepartmentItem(value)
			}else{
				this.changeAdminDetail({value,key})
			}
		},
	},
	watch: {
		classCode(val){
			const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z]/
			if(reg.exec(val)!==null) this.number=val.replace(/[^0-9]/g,'')
			if(isNaN(parseFloat(val))) this.number=''
		}
	}
}
</script>