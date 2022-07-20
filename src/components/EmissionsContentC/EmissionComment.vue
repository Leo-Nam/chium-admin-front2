<template>
    <v-card flat>
		<v-card-text>
			<v-container>
				<v-row 
					no-gutters 
				>
					<v-col 
						cols="2"
					>
						요청사항
					</v-col>
					<v-col 
						cols="10"
					>
						<v-textarea
							solo
							outlined
							flat
							:value="value"
							:style="{
								'width': `${width}`,
								'height': `${height}`
							}"
						></v-textarea>	
					</v-col>
				</v-row>
			</v-container>
		</v-card-text>
    </v-card>
</template>
<script>
export default {
	props : {
		width : {
			type : Number,
			default : 0
		},
		height : {
			type : Number,
			default : 0
		},
		value : {
			type : String,
			default : null
		},
	},
}
</script>
<style>
</style>
