<template>
 <div>
   <div v-if="loading"><spinner></spinner></div>
   <div v-else class="board-header">
     <transition v-if="!isEditTitle" name="fade">
        <h2 @click="onClickTitle">{{board.title}}</h2>
     </transition>
    <transition v-else>
       <input  v-model="inputTitle" @keyup.enter="onSubmitTitle" type="text" ref="inputTitle" @blur="onSubmitTitle">
    </transition>
   </div>
    <div class="board-wrapper">
      <div class="board-list" v-for="list in board.lists" :key="list.id">
        <board-list :list="list"></board-list>
      </div>
  </div>
 </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import BoardList from './BoardList.vue';
import Spinner from './common/spinner.vue';

export default {
  components:{
    BoardList,
    Spinner
  },
  data() {
    return {
     isEditTitle:false,
     inputTitle:'',
     loading:false
    }
  },
  computed:{
    ...mapState(['board'])
  },
  methods: {
    ...mapActions(['BOARD_FETCH','UPDATE_BOARD']),
    fetchData(){
      const id =this.$route.params.bid;
      return this.BOARD_FETCH(id)
      .then((res)=>{
        this.data=res.data;
      })
    },
    onClickTitle(){
      this.isEditTitle=true;
      this.$nextTick(()=>this.$refs.inputTitle.focus())
    },
     onSubmitTitle(){
      this.isEditTitle=false;
      this.inputTitle=this.inputTitle.trim();
      if(! this.inputTitle || this.inputTitle === this.board.title) return
      this.loading=true;
  this.UPDATE_BOARD({id:this.board.id,title:  this.inputTitle})
  .then(()=>{
    this.loading=false
    this.BOARD_FETCH(this.board.id);
  })



    }

  },
  created(){
    this.fetchData()
    .then(()=>{
      this.inputTitle=this.board.title
    })
  },




}
</script>

<style scoped>
.board-header h2{font-size: 20px;}
.board-header  input{height:24px; border: none; box-shadow: 0 0 5px dodgerblue; outline: none;}
.board-header  input:focus{box-shadow:0 0 5px dodgerblue;}
.board-wrapper{display: flex;}
.board-list{width: 25%; margin: 1%; overflow: hidden; }
.fade-active{
  transition: all 0.8s;
}
.fade-enter,.fade-leave-to{
  opacity: 1;
}
</style>