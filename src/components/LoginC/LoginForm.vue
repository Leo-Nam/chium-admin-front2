<template>
  <v-card style="overflow : hidden; display : flex">
    <div style="width : 50%; background-color : #01b286">
      <v-img
        height="100%"
        lazy-src="https://chium.s3.ap-northeast-2.amazonaws.com/temp/admin-1651803316.png"
        src="https://chium.s3.ap-northeast-2.amazonaws.com/temp/admin-1651803316.png"
      />
    </div>
    <div
      class="right-login-box"
    >
      <div>
        <v-row>
          <v-col
            class="input-label"
            cols="4"
          >
            <v-subheader style="font-size : 16px; font-weight : bold">
              아이디
            </v-subheader>
          </v-col>
          <v-col>
            <v-text-field 
				v-model="adminId" 
				@keyup="setLoginInfo('adminId', $event)"
			/>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="input-label"
            cols="4"
          >
            <v-subheader style="font-size : 16px; font-weight : bold">
              비밀번호
            </v-subheader>
          </v-col>
          <v-col>
            <v-text-field
              v-model="adminPw"
              type="password"
				@keyup="setLoginInfo('adminPw', $event)"
            />
          </v-col>
        </v-row>
		<div v-if="getUserInit===true">
			<v-row>
				<v-col
					class="input-label"
					cols="4"
				>
					<v-subheader style="font-size : 16px; font-weight : bold">
					비밀번호확인
					</v-subheader>
				</v-col>
				<v-col>
					<v-text-field
					v-model="adminPw2"
					type="password"
					@keyup="setLoginInfo('adminPw2', $event)"
					/>
				</v-col>
			</v-row>
		</div>
        <v-row justify="end">
          <v-col cols="auto">
			<div v-if="getUserInit===true">
				<v-btn @click="initUserInfo">
				수정
				</v-btn>
			</div>
			<div v-else>
				<v-btn @click="loginBtn">
				로그인
				</v-btn>
			</div>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-card>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from "vuex"
export default {
  data(){
    return {
      adminId : '',
      adminPw : '',
      adminPw2 : ''
    }
  },
	computed : {
		...mapGetters('auth',['getUserInit', 'getUserId'])
	},
  methods : {
    ...mapActions('auth', ['login', 'sp_admin_init_user']),
      ...mapMutations('auth',['setUserItem']),
    loginBtn(){
		console.log('loginbtn')
      this.login({adminId : this.adminId, adminPw : this.adminPw})
    },
    initUserInfo(){
		console.log('zzzㅋㅋㅋ')
		if (this.adminPw === this.adminPw2){
			this.sp_admin_init_user()
		}else{
			alert("암호가 일치하지 않습니다.")
		}
    },
	setLoginInfo(key, event){
		this.setUserItem({key:key, payload:event.target.value})
	}
  }
}
</script>
<style lang="scss">
.right-login-box {
  width : 50%;
  padding : 20px;
  display : flex;
  justify-content: center;
  align-items: center;
  .input-label {
    padding-left : 0;
    padding-right : 0;
    display: flex;
    justify-content: center;
    align-items: center;
	width: 200px;
  }
}
.cols-padding-x-zero {
      padding-left : 0;
    padding-right : 0;
}

</style>
