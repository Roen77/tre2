<template>
      <modal class="modal-card">
      <div slot="header" class="header">
          <div class="title">
             <transition name="fade">
                  <input  ref="inputTitle" @click="EditTitle"  @blur="submitTitle" :readonly="!isEditTitle" type="text" :value="card.title" >
             </transition>
          </div>
          <span class="close_btn" @click="closeCard">&times;</span>
      </div>
      <div slot="body">
          <p>description</p>
          <textarea name="" @click="EditDesc" :readonly="!isEditTDesc"    cols="30" rows="10" ref="inputDesc" @blur="submitDesc"  :value="card.description"></textarea>
      </div>
      <div slot="footer">
          <pre>{{card}}</pre>
      </div>
  </modal>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Modal from './common/Modal.vue'
export default {
  components: { Modal },
  data() {
      return {
          isEditTitle: false,
          isEditTDesc:false,
      }
  },
  computed:{
      ...mapState(['card','board'])
  },
  created(){
      this.fetchCard();

  },
  methods: {
      ...mapActions(['FETCH_CARD','UPDATE_CARD']),
      EditTitle(){
          this.isEditTitle=true;
      },
      EditDesc(){
          this.isEditTDesc=true;
      },
      submitTitle(){
          this.isEditTitle=false;
          const id =this.card.id;
          const title =this.$refs.inputTitle.value.trim();
          if(!title) return
          console.log('타이틀같아도 리턴되는지확인')
          this.UPDATE_CARD({id,title})
          .then((res)=>{
              console.log(res.data)
               this.fetchCard();
          })
      },
      submitDesc(){
           const id =this.card.id;
          const description =this.$refs.inputDesc.value.trim();
          if(!description) return
             this.UPDATE_CARD({id,description})
          .then((res)=>{
              console.log(res.data)
              this.fetchCard();
          })
      },
      closeCard(){
          this.$router.push(`/b/${this.board.id}`)
      },
      fetchCard(){
           const id=this.$route.params.cid;
          this.FETCH_CARD({id})
      }

  },

}
</script>

<style>
.modal-card .header{position: relative;}
.modal-card .close_btn{position: absolute; right: 10px; top:10px; font-size: 30px;}
.modal-card .modal-container{
    width: 60%;
}
.modal-card .modal-container textarea{
    width: 100%;
} 
.modal-card .title input{
    line-height: 30px;
    outline: none;
    border: none;
}
.modal-card .title input:focus{
    box-shadow: 2px 2px 10px dodgerblue;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>