<template>
	<div style="width:480px">
		<v-row>
			<v-col><div style="width:100%;height:150px;text-align:center"><h1>Chium Manager</h1></div>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-text-field 
					v-model="adminId" 
					color="red"
					placeholder="코드"
					outlined
					class="minjae-text-filed-class"
					style="text-align:center"
					@keyup="setLoginInfo('adminId', $event)"
				/>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-text-field
					v-model="adminPw"
					type="password"
					placeholder="패스워드"
					outlined
					class="minjae-text-filed-class"
					@keyup="setLoginInfo('adminPw', $event)"
				/>
			</v-col>
		</v-row>
		<div v-if="getUserInit===true">
			<v-row>
				<v-col>
					<v-text-field
						v-model="adminPw2"
						type="password"
						color="white"
						placeholder="패스워드확인"
						outlined
						class="minjae-text-filed-class"
						@keyup="setLoginInfo('adminPw2', $event)"
					/>
				</v-col>
			</v-row>
		</div>
		<v-row justify="center">
			<v-col cols="auto">
				<div v-if="getUserInit===true">
					<v-btn 
						rounded
						width="480px"
						height="60px"
						@click="initUserInfo"
						class="minjae-button-class"
					>
						수정
					</v-btn>
				</div>
				<div v-else>
					<v-btn 
						rounded
						width="480px"
						height="60px"
						@click="loginBtn"						
						class="minjae-button-class"
					>
						<span style="font-family:'sans-serif';font-size:20px">Log In</span>
					</v-btn>
				</div>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col><div style="width:100%;text-align:center"><h3>Ver.0.0.15</h3></div>
			</v-col>
		</v-row>
	</div>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from "vuex"
export default {
	data(){
		return {
			adminId : '',
			adminPw : '',
			adminPw2 : '',
		}
	},
	computed : {
		...mapGetters('auth',['getUserInit', 'getUserId']),
	},
	methods : {
		...mapActions('auth', ['login', 'sp_admin_init_user']),
		...mapMutations('auth',['setUserItem']),
		loginBtn(){
			console.log('components:LoginC:LoginForm.vue:loginBtn:','loginbtn')
			this.login({adminId : this.adminId, adminPw : this.adminPw})
		},
		initUserInfo(){
			console.log('components:LoginC:LoginForm.vue:initUserInfo:','zzzㅋㅋㅋ')
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
<style scoped>
	.v-text-field--outlined >>> fieldset 
	{
		border-color: rgba(0, 0, 0, 1);
	}
	.minjae-button-class {
		box-sizing: border-box;

		width: 680px;
		height: 56px;

		background: #000000;
		border: 1px solid #000000;
		border-radius: 80px;
		margin-top: 60px;
	}
	.minjae-text-filed-class{
		box-sizing: border-box;

		width: 480px;
		height: 56px;

		border: 1px solid #000000;
		border-radius: 80px;
	}
</style>
