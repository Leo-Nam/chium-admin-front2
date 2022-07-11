<template>
	<div>
	<div>관심업체</div>
	<v-chip-group
		active-class="primary--text"
		column
	>
		<v-chip
		v-for="site in getInterestedSiteList"
		:key="site"
		>
              <a
                :href="returnUrl(site['TARGET_ID'])"
              >
                {{ site['TARGET_NAME'] }}
              </a>
		
		</v-chip>
	</v-chip-group>
	</div>
</template>
<script>
import { mapGetters} from "vuex"
export default {
  data(){
    return {
    }

  },
  computed : {
    ...mapGetters('selectedUser',['getInterestedSiteList'])
  },

  methods : {
    returnUrl(siteId){
		return `/admin/main/emitter-collector/${siteId}`
    },
  }
}
</script>
<style lang="">

</style>
