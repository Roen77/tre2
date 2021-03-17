<template>
  <header class="header">
    <div class="header-logo">
      <router-link to="/">Home</router-link>
    </div>
    <div class="header-auth">
        <router-link v-if="!isAuth" to="/login">로그인</router-link>
        <div v-else>
             <span>{{email}}님 환영합니다</span>
                <a href="#" @click.prevent="logout">로그아웃</a>
        </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
    computed:{
        ...mapState(['email']),
        ...mapGetters(['isAuth'])
    },
    methods: {
        ...mapMutations(['LOGOUT']),
        logout(){
            this.LOGOUT();
            alert('성공적으로 로그아웃되었습니다.')
            this.$router.push('/login')
        }
    },

}
</script>

<style scoped>
a{text-decoration: none;}
.header{background-color: rgba(30, 143, 255, 0.356); display: flex; align-items: center; height: 50px; padding: 5px; position: relative;}
.header-logo{position: absolute; left:50%; transform: translateX(-50%);   font-weight: bold; font-size: 24px;}
.header-logo a{color:#fff;}
.header-auth{
    margin-left: auto;
}
.header-auth a{
    background-color: royalblue;
    color:#fff;
    border-radius: 10px;
    text-decoration: none;
    padding: 5px;
}
.header-auth span{display: inline-block; margin-right: 5px;}


</style>