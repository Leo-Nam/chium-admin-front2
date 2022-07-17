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
							v-for="th in getTableConfig.columns.title"
							:key="th.name"
							class="text-left"	
							:style="{'color': `${getTableConfig.columns.color}`}"						
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
							v-for="item in getTableConfig.columns.title"
							:key="item.binding"
							:style="{ 
								'color': `${item.color}`
							}"
						>
							<span
								v-if="item.type==='switch'"
							>
								<v-img 
									:src="person[item.binding]===1 ? getS3Img.components.checkOn.src : getS3Img.components.checkOff.src" 
									:width="20" 
								/>
							</span>
							<span
								v-else
							>
								{{ changeValue(item.type, person[item.binding]) }}
							</span>
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
			'getTableConfig',
			'getS3Img'
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
		},
		changeValue(type, v){
			if (type ==='datetime'){
				return this.getTime(v)
			} else {
				return v
			}
		}
	}
}
</script>
<style lang="">

</style>
