<template>
	<div>
		<v-card-title>
			<v-img
				:src="getEmitterCollectorEmoji.src"
				max-width="24"
			>
			</v-img>&nbsp;
			<span
				:style="{ 
					'color': `${getEmitterCollectorTableConfig.titleColor}`
				}"
			>
				사업자회원(배출자, 수거자)
			</span>			
		</v-card-title>
		<v-simple-table
			dense
			fixed-header
			:height="getEmitterCollectorTableConfig.height"
		>
			<template #default>
				<thead>
					<tr>
						<th
							v-for="th in getEmitterCollectorTableConfig.columns.title"
							:key="th.name"
							class="text-left"	
							:style="{'color': `${getEmitterCollectorTableConfig.columns.color}`}"						
						>
							{{ th.name }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="person,idx in getEmitterCollectorList"
						:key="idx"
						style="cursor : pointer"
						@click="goToContent(person.ID)"
					>
						<td
							v-for="item in getEmitterCollectorTableConfig.columns.title"
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
								{{ changeValue(item.type, item.binding, person[item.binding]) }}
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
		return{
			headers: ['ID', '구분', '사이트 이름', '사업자 등록 번호', '등록일자']
		}
	},
	computed : {
		...mapGetters('emitterCollector',[
			'getEmitterCollectorList',
			'getEmitterCollectorTableConfig',
			'getEmitterCollectorEmoji'
		])
	},
	created(){
		console.log('this.getEmitterCollectorEmoji', this.getEmitterCollectorEmoji)
	},
	methods : {
		getTime(time){
			return time.slice(0,19)
		},
		goToContent(siteId){
			this.$router.push({ path: `emitter-collector/${siteId}`})
		},
		checkEmOrCol(code){
			if (Number(code) == 9){
				return '배출자'
			}
			return '수거자'
		},
		changeValue(type, binding, v){
			if (type ==='datetime'){
				return this.getTime(v)
			} else {
				if (binding === 'TRMT_BIZ_CODE'){
					return this.checkEmOrCol(v)
				} else {
					return v
				}
			}
		}
	}



}
</script>
<style lang="">

</style>
