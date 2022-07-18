<template>
	<div>
		<v-card-title>
			<v-img
				:src="emoji.src"
				:max-width="emoji.width"
			>
			</v-img>&nbsp;
			<span
				:style="{ 
					'color': `${config.titleColor}`
				}"
			>
				{{ config.title }}
			</span>
		</v-card-title>
		<v-simple-table
			dense
			fixed-header
			:height="config.height"
		>
			<template #default>
				<thead>
					<tr>
						<th
							v-for="th in config.columns.title"
							:key="th.name"
							class="text-left"	
							:style="{'color': `${config.columns.color}`}"						
						>
							{{ th.name }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="list,idx in lists"
						:key="idx"
						style="cursor : pointer"
						@click="to(list.ID)"
					>
						<td
							v-for="item in config.columns.title"
							:key="item.binding"
							:style="{ 
								'color': `${item.color}`
							}"
						>
							<span
								v-if="item.type==='switch'"
							>
								<v-img 
									:src="list[item.binding]===1 ? s3Img.components.checkOn.src : s3Img.components.checkOff.src" 
									:width="20" 
								/>
							</span>
							<span
								v-else
							>
								{{ changeValue(item.type, list[item.binding]) }}
							</span>
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
	</div>
</template>
<script>
export default {
	props: {
		emoji : {
			type :  Object,
			default : () => {},
		},
		config : {
			type :  Object,
			default : () => {},
		},
		s3Img : {
			type :  Object,
			default : () => {},
		},
		lists : {
			type :  Array,
			default : () => [],
		},
		to : {
			type :  Function,
			default : () => {},
		},
	},
	data(){
		return {
		}
	},
	methods : {
		getTime(time){
			if (time){
				return time.slice(0,19)
			}
			return time
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