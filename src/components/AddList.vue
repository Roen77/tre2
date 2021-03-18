<template>
  <div class="add-list">
      <input v-if="isAddList" type="text" class="form-control" v-model="inputTitle" ref="inputTitle" @blur="restore" @keyup.enter="onsubmitTitle">
      <a href="#" class="" v-else @click.prevent="onAddList">&plus; add list...</a>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    data() {
        return {
            isAddList: false,
            inputTitle:''
        }
    },
    computed:{
        ...mapState(['board'])
    },
    methods: {
        ...mapActions(['ADD_LIST']),
        onAddList() {
            this.isAddList=true;
            this.$nextTick(()=>this.$refs.inputTitle.focus())
        },
        restore(){
            this.isAddList=false;
            this.inputTitle='';
        },
        onsubmitTitle(){
            this.inputTitle=this.inputTitle.trim();
            if(!this.inputTitle) return this.restore();
            const title=this.inputTitle;
            const boardId=this.board.id;
            const lastList=this.board.lists[this.board.lists.length-1]
            const pos=lastList?lastList.pos*2:65535;
            this.ADD_LIST({title,boardId,pos})
            .then(()=>{
                this.inputTitle='';
            })
        }
    },

}
</script>

<style scoped>
.add-list{padding: 10px; background-color: rgba(0,0,0,0.5);}
.add-list a{color:#fff; font-weight: bold;}
input{width: 100%; height: 30px;}
</style>