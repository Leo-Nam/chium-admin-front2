<template>
	<v-container>
		<v-row align="center">
			<v-col>
				<v-select
					:items="items"
					:menu-props="{ maxHeight: '200' }"
					class="custom"
					dense
					height="20"
					hide-details
					v-model="selectedBiz['BIZ_NAME']"
					@change="changeBiz"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
import { mapGetters, mapMutations } from "vuex"
export default {
    data: () => ({
		items: [],
		selectedBiz: {}
    }),
	computed : {
		...mapGetters('notMember', ['getTrmtBiz', 'getSelectedBiz']),
	},
	created(){
		this.getTrmtBizNames()
		this.initSelectedBiz()
	},
	methods : {
		...mapMutations('notMember', ['setSelectedBizCode']),
		getTrmtBizNames(){
			for(let i = 0; i < this.getTrmtBiz.length; i ++){
				this.items.push(this.getTrmtBiz[i]['NAME'])
			}
		},
		changeBiz(a){
			this.selectedBiz = {
				'BIZ_CODE': this.getTrmtBiz[this.items.indexOf(a)]['CODE'],
				'BIZ_NAME': a,
			}
			this.setSelectedBizCode(this.selectedBiz)
			this.selectedBiz = this.getSelectedBiz
		},
		initSelectedBiz(){
			this.selectedBiz = this.getSelectedBiz
		}
	}
}
</script>
<style lang="scss" >
.custom {
	border-style : none;
}
</style>