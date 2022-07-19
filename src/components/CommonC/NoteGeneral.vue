<template>
    <v-card>
		<v-card-title>
			<span class="text-h5">상담 내용 작성</span>
		</v-card-title>
		<v-card-text>
			<v-container>
				<v-row>
					<v-col
						cols="12"
						sm="6"
						md="4"
					>
						siteId : {{ siteid }}
					</v-col>
					<v-col
						cols="12"
						sm="6"
						md="4"
					>
						orderId : {{ orderid }}
					</v-col>
					<v-col cols="12">
						<v-textarea
							v-model="noteDetails.note"
							name="input-7-1"
							label="상담 내용"
							hint="Hint text"
						/>
					</v-col>
				</v-row>
			</v-container>
		</v-card-text>
		<v-card-actions>
			<v-spacer />
			<v-btn
				color="blue darken-1"
				text
				@click="modify"
			>
				Save
			</v-btn>
			<v-btn
				color="blue darken-1"
				text
				@click="closeNote"
			>
				취소
			</v-btn>
		</v-card-actions>
    </v-card>
</template>
<script>
import {mapMutations, mapActions} from "vuex"
export default {
	props : {
		dialog : {
			type : Boolean,
			default : false
		},
		siteid : {
			type : Number,
			default : 0
		},
		orderid : {
			type : Number,
			default : 0
		},
		sitecategory : {
			type : Number,
			default : 0
		},
	},

	data(){
		return {
			noteDetails : {}
		}
	},
	methods : {
		...mapActions('common',['sp_admin_insert_note']),
		...mapMutations('common',['setNoteDetailIds']),
		modify(){
			this.noteDetails.siteId = this.siteid
			this.noteDetails.orderId = this.orderid
			this.noteDetails.siteCategory = this.sitecategory
			this.setNoteDetailIds(this.noteDetails)
			this.sp_admin_insert_note()
			this.closeNote()
		},
		closeNote(){
			console.log('closeNote emitted')
			this.$emit('closed', 'none')
		}
	},
}
</script>
<style>
</style>
