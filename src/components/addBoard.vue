<template>
    <modal>
        <div slot="header" class="header">
            <div class="title">Create new board</div>
            <div class="close-btn" @click="$emit('close')">&times;</div>
        </div>
        <div slot="body" class="content">
           <form @submit.prevent="onSubmit">
                <input type="text" v-model="title" ref="input">
           </form>
            <p v-if="!isvalid" class="warn">보드 제목을 입력해주세요</p>
        </div>
        <div slot="footer">
            <button :disabled="!isvalid" class="btn"  type="submit" @click=" onSubmit">create board</button>
        </div>
    </modal>
</template>

<script>
import { mapActions } from 'vuex';
import Modal from './common/Modal.vue'
export default {
  components: { Modal },
  data() {
      return {
          title: ''
      }
  },
  computed:{
      isvalid(){
          console.log('컴퓨티트~~')
          return this.title.trim().length !==0;
      }
  },
  methods: {
      ...mapActions(['CREATE_BOARD','BOARDS_FETCH']),
    onSubmit() {
        this.CREATE_BOARD({title:this.title})
        .then(({id})=>{
            this.$router.push(`/b/${id}`)
            // this.BOARDS_FETCH();
            this.$emit('close')
        })
        .catch((err)=>{
            console.log(err)
        })
          }
  },
  mounted(){
      this.$refs.input.focus();
  }


}
</script>

<style scoped>
.content{position: relative;}
.content input{
    width: 100%;
    line-height: 25px;
    border:none;
    box-shadow: 0 0 5px dodgerblue;
}
.header{position: relative;}
.btn{padding: 7px; background-color: deeppink; color:#fff; border: none;  border-radius: 10px; cursor: pointer;}
.btn:disabled{background-color:gray; cursor: default;}
.close-btn{position: absolute; right: 0; top: -2px; font-size: 23px; cursor: pointer;}
.warn{position: absolute; background-color: rgb(220, 20, 60);
border-radius:5px;
padding: 2px; top:-120%; right:5%; text-align: center; font-size: 13px; color:crimson; color:#fff; padding: 2px 5px;}
.warn::before{content: ''; position: absolute; width: 9px; height: 9px; background-color: rgba(220, 20, 60, 0.801); left:20%; bottom:0; transform: rotate(45deg) translateY(50%);}
</style>