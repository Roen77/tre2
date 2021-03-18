<template>
  <div class="setting">
      <h2>메뉴</h2>
      <a href="#" class="close-btin"  @click.prevent="SET_SETTING(false)">&times;</a>
      <div class="menu">
          <ul>
              <li><a href="#" @click.prevent="deleteBoard">Delte Board</a></li>
              <li>
                  <p>change Color</p>
                  <div class="color-picker">
                      <a href="#" data-value="crimson" @click.prevent="onChangeTheme"></a>
                      <a href="#" data-value="yellow" @click.prevent="onChangeTheme"></a>
                      <a href="#" data-value="orange" @click.prevent="onChangeTheme"></a>
                      <a href="#" data-value="green" @click.prevent="onChangeTheme"></a>
                  </div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import { mapMutations,mapActions, mapState } from 'vuex'
export default {

    computed:{
        ...mapState(['board'])
    },
    mounted(){
        Array.from(this.$el.querySelectorAll('.color-picker a')).forEach((el)=>{
            const color=el.dataset.value;
            el.style.backgroundColor=color;
        })
    },
    methods: {
        ...mapMutations(['SET_SETTING','SET_THEME']),
        ...mapActions(['DELETE_BOARD','UPDATE_BOARD','BOARD_FETCH']),
        deleteBoard(){
            console.log(this.board)
            if(!window.confirm('보드를 삭제하시겠습니까?')) return
            this.DELETE_BOARD(this.board.id)
            .then(()=>{
                this.$router.push('/')
            })
        },
        onChangeTheme(e){
            const bgColor=e.target.dataset.value;
            this.UPDATE_BOARD({id:this.board.id,bgColor})
            .then(()=>{
                this.BOARD_FETCH(this.board.id)
            })
            .then(()=>{
                this.SET_THEME(bgColor)
            })
        }

    },

}
</script>

<style scoped>
.setting{position: fixed; width: 400px; height: 100vh; background-color: rgb(235, 239, 243); top:0; right: 0;}
h2{padding: 10px 0; border-bottom: 1px solid #ddd; text-align: center;}
.menu ul>li>a{display: block; text-decoration: none; color:#000; font-weight: bold; padding: 10px; border-bottom: 1px solid #ddd;}
.close-btin{position: absolute; font-size: 30px; right: 0; top:0; }
p{font-weight: bold; padding: 10px; border-bottom: 1px solid #ddd;}
.color-picker{
    display: flex;
    flex-wrap: wrap;
}
.color-picker>a{width: 49%; height: 100px; box-sizing: border-box; margin: 0.5%}
</style>