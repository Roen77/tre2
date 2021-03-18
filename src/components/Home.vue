<template>
  <div class="container">
      <h2>보드리스트</h2>
      <div v-if="loading"><spinner></spinner></div>
      <div v-else class="board-lists">
          <ul>
              <li  v-for="board in boardList" :key="board.id">
                <router-link :to="`/b/${board.id}`" :style="`background-color:${board.bgColor}`">
                      <div class="board-titel">{{board.title}}</div>
                </router-link>
              </li>
              <li class="new"  @click.prevent="openBoard"><a href="#">new board..</a></li>
          </ul>
      </div>
      <!-- board-list -->
      <div></div>
      <!-- 보드추가하는모달창 -->
      <add-board v-if="toggleboard" @close="closeBoard"></add-board>
  </div>
</template>
<script>
// list 꺼내기
import { mapActions, mapMutations, mapState } from 'vuex'
import AddBoard from './addBoard.vue';
import spinner from './common/spinner.vue';

export default {
  components: { spinner, AddBoard },
    data() {
        return {
            loading: false,
            toggleboard:false
        }
    },
    computed:{
        ...mapState(['boardList'])
    },
    created(){
       this.fetchData();
       this.SET_THEME();
    },
    methods: {
         ...mapActions(['BOARDS_FETCH']),
         ...mapMutations(['SET_THEME']),
        fetchData() {
            this.loading=true;
            this.BOARDS_FETCH()
            .then(()=>{
                this.loading=false;
            })
        },
        closeBoard(){
            this.toggleboard=false
        },
        openBoard(){
            this.toggleboard=true;
        }

    },



}
</script>

<style scoped>
li{list-style: none;}
.board-lists ul{margin: 10px; display: flex; flex-wrap: wrap; margin: 0 auto; width: 1400px;}
.board-lists ul li{margin: 1%; width: 20%;   min-width: 100px;  }
.board-lists ul li>a{display: block; padding: 30px; height: 40px;  text-align: center; text-decoration: none; color:#fff;}
.new>a{background-color: rgba(65, 105, 225, 0.795);}

@media (max-width:1400px) {
    .board-lists ul{
        width: 100%;
    }
}
</style>