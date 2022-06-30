<template>
  <v-container
    fluid
    style="margin-top : 100px;"
  >
    <v-card style="padding : 40px; width : 50%; margin : 0 auto; ">
      <h2>사용자 추가</h2>
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
            권한
          </v-subheader>
        </v-col>
        <v-col>
          <v-text-field
            placeholder="102~199"
            solo
            hide-details=""
            @input="changeState('classCode',$event)"
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

	computed : {
		...mapGetters('addAdmin',['getDepartment', 'getTitle'])
	},
	created(){
		this.sp_req_b_department()
	},
	methods: {
		...mapActions('addAdmin',['sp_req_b_department', 'sp_admin_insert_manager']),
		...mapMutations('addAdmin',['changeAdminDetail', 'setDepartmentItem']),

		changeState(key,value){
			console.log(value,key)
			if(key === 'department'){
				this.setDepartmentItem(value)
			}else{
				this.changeAdminDetail({value,key})
			}
		},
	},

}
</script>