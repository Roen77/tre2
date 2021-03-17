<template>
  <div>
      <h2>로그인 페이지</h2>
      <form @submit.prevent="onSubmitForm">
          <div>
              <label for="email">email</label>
              <input type="text" id="email" v-model="email">
          </div>
          <div>
              <label for="password">password</label>
              <input type="text" id="password" v-model="password">
          </div>
          <div><button type="submit">로그인</button></div>
      </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    data() {
        return {
            email: '',
            password:'',
            loading:false,
        }
    },
    methods: {
        ...mapActions(['Login']),
         onSubmitForm() {

          this.Login({email:this.email,password:this.password})
          .then(()=>{
              this.$router.push('/')
          })
        }
    },
}
</script>

<style scoped>
h2{text-align: center; margin-bottom: 30px;}
form{
    padding: 30px;
    width: 40%;
    margin: 0 auto;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
form>div{display: flex; padding: 5px;}
form>div label{width: 100px;}
form>div input{flex:1; line-height: 30px;}
form>div  button{width: 100%; line-height: 30px; border: none; background-color: royalblue;}
</style>