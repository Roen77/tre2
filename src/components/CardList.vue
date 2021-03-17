<template>
  <li class="card">
     <router-link :to="`/b/${boardId}/c/${card.id}`">
      <div>{{card.title}}</div>
      <div v-if="card.description" class="des">&equiv;</div>
      </router-link>
  </li>
</template>

<script>
import { mapState } from 'vuex'
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
    }

}
</script>

<style scroped>
li{list-style: none;}
.card {margin: 10px; }
.card a{display: block; width: 100%; background-color: #fff;
text-decoration: none; padding: 5px; box-sizing: border-box; border-radius: 10px; color:#000;}
</style>