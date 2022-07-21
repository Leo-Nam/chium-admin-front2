<template>
  <div>
	<v-card-title>
		Change User Name....
			<v-row>
				<v-col>
					<div
						:style="{
							'text-align': 'center',
							'width': '100%'
						}"
					>
						<v-card 
							flat
							:style="{
								'margin-top': '15px',
							}"
						>
							<h2
								:style="{
									'margin-bottom': '15px',
								}"
							>개인 정보</h2>
							<span>다양한 Chium 업무관리 서비스에서 사용되는 나만의 환경설정에 관한 정보입니다.</span>
						</v-card>
					</div>
				</v-col>
			</v-row>
	</v-card-title>
</div>
</template>
<script>
import {mapMutations} from "vuex"
export default {
	created(){
		this.setCurrentRoute(this.$route.name)
		console.log('this.$route>>>>', this.$route)
	},
	methods : {
		...mapMutations('common',['setCurrentRoute']),
	}
}
</script>
<style lang="">

</style>
