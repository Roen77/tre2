<template>
  <li class="card" :data-card-id="card.id" :data-card-pos="card.pos">
      <span class="btn" @click="deleteCard">&times;</span>
     <router-link :to="`/b/${boardId}/c/${card.id}`">
      <div>{{card.title}}</div >
      <div v-if="card.description" class="des">&equiv;</div>
      </router-link>
  </li>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    props:{
        card:{
            type:Object,
            required:true
        }
    },
    computed:{
        ...mapState({
            boardId:state=>state.board.id
        })
    },
    methods: {
        ...mapActions(['DELETE_CARD']),
        deleteCard() {
          if(!window.confirm(`${this.card.title}을 삭제하시겠습니까??`)) return
            this.DELETE_CARD(this.card.id)
        }
    },

}
</script>

<style scroped>
li{list-style: none;}
.card {margin: 10px; position: relative;}
.card a{display: block; width: 100%; background-color: #fff;
text-decoration: none; padding: 5px; box-sizing: border-box; border-radius: 10px; color:#000;}
.btn{position: absolute; right: 30px; top: 0; cursor: pointer;}
</style>