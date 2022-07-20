<template>
	<v-card>
		<v-row>
			<v-col>
				<div
					:style="{
						'float': 'left',
						'background': '#FF0000',
						'width': `${listWidth}`
					}"
				>
					<v-card
						flat
					>
						<v-card-title>
							관심지역 수거자 리스트
						</v-card-title>

						<v-simple-table
						fixed-header
						dense
						height="300"
						>
						<template #default>
							<thead>
							<tr>
								<th
									v-for="th,idx in collectorTh"
									:key="th+idx"
									class="text-left"
								>
								{{ th }}
								</th>
							</tr>
							</thead>
							<tbody>
							<tr
								v-for="collector,idx in getCollectorListAreaOfInterest"
								:key="idx+collector"
							>
								<td
								style="cursor : pointer"
								@click="goToContent(collector.ID)"
								>
								{{ collector.SITE_NAME }}
								</td>
								<td>{{ collector.PHONE }}</td>
								<td>{{ collector.SI_DO }}</td>
								<td>{{ collector.SI_GUN_GU }}</td>
								<td>{{ collector.TRMT_BIZ_NM }}</td>
								<td>
								<a
									style="cursor : pointer"
									color="primary"
									@click="showNote(collector.ID, 1)"
								>
									노트추가
								</a>
								</td>
							</tr>
							</tbody>
						</template>
						</v-simple-table>
					</v-card>
				</div>
				<div
					:style="{
						'display': `${note.display}`,
						'float': 'left',
						'background': '#FF0000',
						'width': `${noteGeneralWidth}`
					}"
				>
					<NoteGeneral 
						:orderid="orderid"
						:siteid="siteID"
						:sitecategory="siteCategory"
						@closed="changeShowStatus"
					/>
				</div>

			</v-col>
		</v-row>
	</v-card>
</template>
<script>
import NoteGeneral from "../CommonC/NoteGeneral.vue"
import {mapGetters} from "vuex"
export default {
	components : {
		NoteGeneral
	},
	props: {
		orderid: {
			type: Number,
			default: 0
		},
		siteid: {
			type: Number,
			default: 0
		},
	},
	data(){
		return {
			collectorTh : [
				'수거자 이름',
				'핸드폰',
				'시, 도',
				'시, 군, 구',
				'업종',
				'노트추가'
			],
			dialog: false,
			siteID: 0,
			listWidth: '100%',
			noteGeneralWidth: '0%',
			note: {
				display: 'none'
			}
		}
	},
	computed : {
		...mapGetters('emissions',['getCollectorListAreaOfInterest'])
	},
	methods : {
		getTime(time){
			return time.slice(0,19)
		},
		goToContent(siteId){
			this.$router.push({ path: `/admin/main/emitter-collector/${siteId}`})
		},
		showNoteCreatePopup(siteId){
			this.dialog = true
			this.siteID = siteId
		},
		showNote(siteId, siteCategory){
			console.log('hello note')
			this.noteGeneralWidth='30%'
			this.listWidth='70%'
			this.note.display = 'inline'
			this.siteID = siteId
			this.siteCategory = siteCategory
		},
		closeDialog(){
			this.dialog = false
		},
		changeShowStatus(v){
			console.log('close note sign received')
			this.noteGeneralWidth='0%'
			this.listWidth='100%'
			this.note.display = v
		}
	},
}
</script>
<style scoped>
</style>
