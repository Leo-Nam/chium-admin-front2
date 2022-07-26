<template>
	<v-card
		flat
		v-resize="onResize"
	>
		<v-simple-table
			fixed-header
			height="350"
		>
			<template #default>
				<thead>
					<tr v-if="getNowSelectedOpt === '회원사 거리'">
						<th
							v-for="th in memberTh"
							:key="th"
							class="text-left"
						>
							{{ th }}
						</th>
					</tr>
					<tr v-else-if="getNowSelectedOpt === '비회원사 거리'">
						<th
							v-for="th in notMemberTh"
							:key="th"
							class="text-left"
						>
							{{ th }}
						</th>
					</tr>
				</thead>
				<tbody v-if="getNowSelectedOpt === '회원사 거리'">
					<tr
						v-for="site,idx in getCollectorListWithin"
						:key="idx"
					>
						<td
							style="cursor : pointer"
							@click="goToContent(site.ID, 1)"
						>
							{{ site.SITE_NAME }}
						</td>
						<td>{{ site.PHONE }}</td>
						<td>{{ changeToString(site.DIST) }}</td>
						<td>
							<a
								style="cursor : pointer"
								color="primary"
								@click="showNote(site.ID, 1)"
							>
								노트추가
							</a>
						</td>
					</tr>
				</tbody>
				<tbody v-else-if="getNowSelectedOpt === '비회원사 거리'">
					<tr
						v-for="site,idx in getCollectorListWithin"
						:key="idx"
						style="cursor : pointer"
					>
						<td
							style="cursor : pointer"
							@click="goToContent(site.ID, 0)"
						>
							{{ site.SITE_NAME }}
						</td>
						<td>{{ site.PHONE }}</td>
						<td>{{ changeToString(site.DIST) }}</td>
						<td>{{ changeToIsTransit(site.IS_TRANSIT) }}</td>
						<td>
							<a
								style="cursor : pointer"
								color="primary"
								@click="showNote(site.ID, 0)"
							>
								노트추가
							</a>
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<div
			:style="{
				'display': `${note.display}`
			}"
		>
			<NoteGeneral 
				:orderid="orderid"
				:siteid="siteID"
				:sitecategory="siteCategory"
				@closed="changeShowStatus"
			/>
		</div>
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
		return{
			windowSize: {
				x: 0,
				y: 0,
			},
			memberTh : [
				'사업자명',
				'연락처',
				'거리',
				'노트추가',
			],
			notMemberTh : [
				'사업자명',
				'연락처',
				'거리',
				'수집운반',
				'노트추가2',
			],
			dialog: false,
			siteID: 0,
			siteCategory: 0,
			note: {
				display: 'none'
			}
		}
	},
	computed : {
		...mapGetters('emissions',['getCollectorListWithin','getNowSelectedOpt'])
	},
	mounted () {
		this.onResize()
	},
	methods : {
		changeToString(value){
			if(value){
				return String(value).slice(0,4) + 'KM'
			}
			return value
		},
		changeToIsTransit(value){
			if(value == 1){
				return '가능'
			}
			return '불가능'
		},
		goToContent(siteId, siteCategory){
			if(siteCategory === 1) {
				this.$router.push({ path: `/admin/main/emitter-collector/${siteId}`})
			} else {
				this.$router.push({ path: `/admin/main/not-member/${siteId}`})
			}
		},
		showNoteCreatePopup(siteId, siteCategory){
			this.dialog = true
			this.siteID = siteId
			this.siteCategory = siteCategory
		},
		closeDialog(){
			this.dialog = false
		},
		showNote(siteId, siteCategory){
			this.note.display = 'inline'
			this.siteID = siteId
			this.siteCategory = siteCategory
		},
		onResize () {
			this.windowSize = { x: window.innerWidth, y: window.innerHeight }
		},
		changeShowStatus(v){
			this.note.display = v
		}
	}
}
</script>
<style lang="">

</style>
