<template>
	<div>
		<v-card-title>
			<v-img
				:src="getEmojiPath"
				max-width="24"
			>
			</v-img>&nbsp;
			<span
				:style="{ 
					'color': `${getTableConfig.titleColor}`
				}"
			>
				개인 배출자
			</span>
		</v-card-title>
		<v-simple-table
			dense
			fixed-header
			height="700px"
		>
			<template #default>
				<thead>
					<tr>
						<th
							v-for="th in getTableConfig.head.columns.title2"
							:key="th.name"
							class="text-left"	
							:style="{'color': `${getTableConfig.head.columns.color}`}"						
						>
							{{ th.name }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="person,idx in getPersonEmitterList"
						:key="idx"
						style="cursor : pointer"
						@click="goToContent(person.ID)"
					>
						<td
							v-for="item in getTableConfig.head.columns.title2"
							:key="item.binding"
						>
							{{ person[item.binding] }}
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
	</div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
	data(){
		return {
		}
	},
	computed : {
		...mapGetters('emitterCollector',[
			'getPersonEmitterList', 
			'getEmojiPath', 
			'getTableConfig'
		]),

	},
	created(){
		console.log('this.getEmojiPath', this.getEmojiPath)
	},
	methods : {
		getTime(time){
			if (time){
				return time.slice(0,19)
			}
			return time
		},
		goToContent(personEmitterId){
			this.$router.push({ path: `./${personEmitterId}`})
		},
		changeStateToEmoji(state){
			return  state ? '✅' : '❌'
		}
	}
}
</script>
<style lang="">

</style>
