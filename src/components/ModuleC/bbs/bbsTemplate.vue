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
							<span
								v-if="th.hasOwnProperty('display') === false"
							>
								{{ th.name }}
							</span>
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
								v-if="item.hasOwnProperty('display') === false"
							>
								<span
									v-if="item.type==='currency'"
								>
									{{ changeNumToCurrency(list[item.binding]) }}
								</span>
								<span
									v-else
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
										<span
											v-if="item.hasOwnProperty('shorten')"
										>
											{{ changeValue(item.type, list[item.binding], item.shorten) }}
										</span>
										<span
											v-else
										>
											<span
												v-if="item.hasOwnProperty('redirect')"
											>
												<span
													v-if="item.redirect.hasOwnProperty('check')"
												>
													<a
														:href="returnUrl(item.redirect.options[Number(list[item.redirect.check])].to, list[item.redirect.options[Number(list[item.redirect.check])].binding])"
													>
														{{ changeValue(item.type, list[item.binding], null) }}
													</a>
												</span>
												<span
													v-else
												>
													<a
														v-if="item.redirect !== null"
														:href="returnUrl(item.redirect.to, list[item.redirect.binding])"
													>
														{{ changeValue(item.type, list[item.binding], null) }}
													</a>
												</span>
											</span>
											<span
												v-else
											>
												{{ changeValue(item.type, list[item.binding], null) }}
											</span>
										</span>
									</span>
								</span>
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
		}
	},
	data(){
		return {
			dialog : false,
			content : null,
		}
	},
	methods : {
		getTime(time){
			if (time){
				return time.slice(0,19)
			}
			return time
		},
		changeValue(type, v, shorten){
			if (type ==='datetime'){
				return this.getTime(v)
			} else {
				if (shorten !== null) {
					if (shorten.apply === true) {
						return this.shortenContent(v, shorten.maxLength)
					} else {
						return v
					}
				} else {
					return v
				}
			}
		},
		changeNumToCurrency(v){
			if (v == null){
				return
			}
			return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'원'
		},
		shortenContent(v, length){
			console.log(v, length)
			if (v !== null && v.length > 35){
				console.log('v.slice(0, Number(length))>>>>>>', v.slice(0, Number(length)))
				return v.slice(0, Number(length)) + '...'
			}
			return v
		},
		returnUrl(to, Id){
			if (Id !== null){
				return `/admin/main/${to}/${Id}`
			} else {
				return
			}
		},
		showMeLog(v){
			const newArr = v.split('/n')
			this.content = newArr
			this.dialog = true
		},
		closeDialog(){
			this.dialog = false
		},
	}
}
</script>
<style lang="">
</style>