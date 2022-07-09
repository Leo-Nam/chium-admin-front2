<template>
  <v-row justify="center">
    <v-dialog
      :value="dialog"
      persistent
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          사업장 폐기물 선택해주세요1
        </v-card-title>
        <v-row>
          <v-col>
            <v-simple-table
              :height="300"
              fixed-header
              dense
            >
              <template #default>
                <thead>
                  <tr>
                    <th class="text-center">
                      폐기물 대구분
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item,idx in wsteClassList"
                    :key="idx"
                    style="cursor : pointer"
                    @click="selectWsteClass(item,$event)"
                  >
                    <td>[{{ item.CODE }}] {{ item.NAME }} </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="green darken-1"
            text
            @click="closeDialog"
          >
            확인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>

import {mapGetters, mapMutations} from "vuex"
export default {
  props : {
    dialog : {
      type : Boolean,
      default : false
    }},
  data(){
    return {
      wsteClassList : [],
      keyword : '',
      timer : '',
      wsteClass : null,
      nowTarget : '',
    }
  },
  computed: {
    ...mapGetters('selectedUser',['getSeletedUser']),
    ...mapGetters('common',['showWsteLists']),

    },
  created(){
    this.wsteClassList = this.showWsteLists.wsteClassList
  },

    methods: {
      ...mapMutations('selectedUser',['addWsteClassList']),
      setNull(){
        if (this.nowTarget) {

          this.nowTarget.classList.remove('active')
          this.nowTarget = null
        }
        this.wsteClass = null
      },
      closeDialog(){
        if (this.wsteClass){
          this.addWsteClassList({
            WSTE_CLASS_NAME : this.wsteClass.WSTE_CLASS_NAME,
            WSTE_CLASS_CODE: this.wsteClass.WSTE_CLASS_CODE,
            })
          this.$emit('close-dialog')
        }else {
          this.$emit('close-dialog')
        }
        this.setNull()
      },
      selectWsteClass(v,event){
        if (this.wsteClass == null)
        {
          event.target.classList.toggle('active')
          this.nowTarget = event.target
          this.wsteClass = { WSTE_CLASS_NAME : v.NAME , WSTE_CLASS_CODE : v.CODE }
        }
        else if (v.CODE == this.wsteClass.CODE){
          event.target.classList.toggle('active')
          this.nowTarget = null
          this.wsteClass = null
        }
        else {
          alert('하나만 선택해주세요')
        }
      },
    },

}
</script>
<style >
.active {
  background-color: red;
  color: white;
}
tbody tr:nth-child(odd) {
   background-color: rgba(238, 239, 243, 0.5) !important;
}
</style>
