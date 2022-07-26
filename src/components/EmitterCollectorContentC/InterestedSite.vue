<template>
	<div>
	<div>관심업체</div>
	<v-chip-group
		active-class="primary--text"
		column
	>
		<span
			v-if="userType === 1"
		>
			<v-chip
				v-for="site, idx in getInterestedSiteList"
				:key="site+idx"
			>
				<a
					:href="returnUrl(site['TARGET_ID'])"
				>
					{{ site['TARGET_NAME'] }}
				</a>
			
			</v-chip>
		</span>
		<span
			v-else
		>
			<v-chip
				v-for="site, idx in getPersonalInterestedSiteList"
				:key="site+idx"
			>
				<a
					:href="returnUrl(site['TARGET_ID'])"
				>
					{{ site['TARGET_NAME'] }}
				</a>
			
			</v-chip>
		</span>
	</v-chip-group>
	</div>
</template>
<script>
import { mapGetters} from "vuex"
export default {
	props: {
		userType: {
			type: Number,
			default: 1
		}
	},
  data(){
    return {
    }

  },
  computed : {
    ...mapGetters('selectedUser',[
		'getInterestedSiteList', 
		'getPersonalInterestedSiteList'
	])
  },

  methods : {
    returnUrl(siteId){
		return `/admin/main/emitter-collector/${siteId}`
    },
  }
}
</script>
<style scoped>
	a:link { 
		text-decoration: none; 
		color: black
	}
	a:visited { 
		text-decoration: none; 
		color: black
	}
	a:hover { 
		text-decoration: none; 
		color: black
	}
	a:active { 
		text-decoration: none; 
		color: black
	}

</style>
