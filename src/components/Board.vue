<template>
 <div class="board-container">
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
      <div class="board-list" :data-list-id='list.id' v-for="list in board.lists" :key="list.id">
        <board-list :list="list"></board-list>
      </div>
      <div class="board-list">
        <add-list></add-list>
      </div>
  </div>
  <!-- card -->
  <router-view></router-view>
  <!-- boardsetting -->
  <div class="show_btn" @click="SET_SETTING(true)">show_menu</div>
 <transition name="showmenu">
    <show-setting  v-if="isshow"></show-setting>
 </transition>
 </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import BoardList from './BoardList.vue';
import Spinner from './common/spinner.vue';
import dragger from '../utils/dragger'
import ShowSetting from './common/ShowSetting.vue';
import AddList from './AddList.vue';


export default {
  components:{
    BoardList,
    Spinner,
    ShowSetting,
    AddList
  },
  data() {
    return {
     isEditTitle:false,
     inputTitle:'',
     loading:false,
     cDaragger:null,
     ldragger:null,
    }
  },
  updated(){
    this.setDragable();
    this.setListDragable();
  },
  //update
  computed:{
    ...mapState(['board','isshow'])
  },
  methods: {
    ...mapActions(['BOARD_FETCH','UPDATE_BOARD']),
    ...mapActions(['UPDATE_CARD','UPDATE_LIST']),
    ...mapMutations(['SET_THEME','SET_SETTING']),
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



    },
    setDragable(){
        if(this.cDaragger) this.cDaragger.destroy();
      //1 li를 감싸는 부모요소를 가져온다 card-wrapper
      //유사배열이므로 배열로만들어주기
    this.cDaragger=dragger.init(Array.from(this.$el.querySelectorAll('.card-wrapper')));
    this.cDaragger.on('drop',(el,wrapper)=>{
            const targetCard={
              id:el.dataset.cardId*1,
              listId:wrapper.dataset.listId*1,
              pos:65535
      };
      const {prev,next}=dragger.sibling({el
      ,wrapper
      ,candidates:Array.from(wrapper.querySelectorAll('.card'))
      ,type:'card'
      });

           if(!prev && next){
              targetCard.pos=next.pos/2;
            }else if(!next && prev){
              targetCard.pos=prev.pos*2;
            }else if(prev && next){
              targetCard.pos=(next.pos+prev.pos)/2;
            }
            console.log(targetCard.pos)
            this.UPDATE_CARD(targetCard)
    });//on
    },
    setListDragable(){
          if(this.ldragger) this.ldragger.destroy();
      //1 li를 감싸는 부모요소를 가져온다 card-wrapper
      //유사배열이므로 배열로만들어주기
    this.ldragger=dragger.init(Array.from(this.$el.querySelectorAll('.board-wrapper')));
    this.ldragger.on('drop',(el,wrapper)=>{
            const targetList={
              id:el.dataset.listId*1,
              pos:65535
      };
      const {prev,next}=dragger.sibling({el
      ,wrapper
      ,candidates:Array.from(wrapper.querySelectorAll('.list'))
      ,type:'list'
      });

           if(!prev && next){
             targetList.pos=next.pos/2;
            }else if(!next && prev){
             targetList.pos=prev.pos*2;
            }else if(prev && next){
             targetList.pos=(next.pos+prev.pos)/2;
            }
            console.log(targetList.pos)
            this.UPDATE_LIST(targetList)
    });//on

    }//setList
  
  },
  created(){
    this.fetchData()
    .then(()=>{
      this.SET_THEME(this.board.bgColor)
      this.inputTitle=this.board.title
    })
    this.SET_SETTING(false)
  },




}
</script>

<style scoped>
.board-container{position: relative;}
.board-header h2{font-size: 20px;}
.board-header  input{height:24px; border: none; box-shadow: 0 0 5px dodgerblue; outline: none;}
.board-header  input:focus{box-shadow:0 0 5px dodgerblue;}
.board-wrapper{display: flex; margin: 10px 0 0;}
.board-list{width: 300px; min-width: 300px; margin:0 1%; overflow: hidden; }
.fade-active{
  transition: all 0.8s;
}
.fade-enter,.fade-leave-to{
  opacity: 1;
}
.show_btn{position: absolute; right: 10px; font-weight: bold; color:#fff; top: 10px; cursor: pointer;}
.showmenu-enter-active,
.showmenu-leave-active{
  transition: all 0.5s;
}
.showmenu-enter,
.showmenu-leave-to{
  transform:translateX(100%);
}
</style>