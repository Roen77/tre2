<template>
  <div class="add-card">
      <form @submit.prevent="submitaddCard">
          <input type="text" ref="inputText" v-model="cardTitle">
          <button type="submit">add Card</button>
          <div class="close-btn" @click="$emit('close')">&times;</div>
      </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    props:{
        listId:{
            type:Number,
            required:true
        }
    },
    data() {
        return {
            toggleCard: false,
            cardTitle:'',
        }
    },
    computed:{
        addCard(){
            return !this.toggleCard
        }
    },
    methods: {
        ...mapActions(['CREATE_CARD']),
         submitaddCard() {
             const pos=this.newCardPos();
                       this.CREATE_CARD({title:this.cardTitle,listId:this.listId,pos})
          .then(()=>{
              console.log(pos)
              this.cardTitle='';
          })
        },
        newCardPos(){
            const curList=this.$store.state.board.lists.filter(l =>l.id ===this.listId)[0]
            //현재리스트구하기
            if(!curList) return 65535
            const {cards}=curList;
            if(!cards.length) return 65535;
            console.log('현재리스트구하기',curList)
            return cards[cards.length-1].pos*2;

        }
    },
    mounted(){
          this.$refs.inputText.focus();
    }

}
</script>

<style scoped>
.add-card{position: relative; padding: 10px; box-sizing: border-box;}
a{color:#fff; text-decoration: none;}
input{width: 100%; margin: 10px 0; line-height: 30px; padding: 0 10px; box-sizing: border-box;}
button{display: block; border: none; background-color:slateblue; padding: 10px; color:#fff; cursor: pointer;}
.close-btn{position: absolute; bottom:10px; right: 10px; color:#fff; font-weight: bold; font-size: 25px; cursor: pointer;}
</style>