import Vue from 'vue';
import Vuex from 'vuex';
import * as api from '../api/index'
import {setlocalAuth,getlocalAuth,getlocalemail,setlocalemail} from '../utils/setLocalAuth'


Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        token: getlocalAuth()||'',
        email:getlocalemail() ||'',
        boardList:[],
        board:{},
    },
    getters:{
        isAuth(state){
            return !! state.token
        }
    },
    mutations:{
        LOGIN(state,{accessToken,email}){
            if(!accessToken) return;
            state.token=accessToken;
            setlocalAuth(accessToken);
            setlocalemail(email)
            state.email=email;
        },
        LOGOUT(state){
            state.token='';
            state.email='';
            delete localStorage.auth;
            delete localStorage.email;
        },
        SET_BOARDlIST(state,boardList){
            state.boardList=boardList
        },
        SET_BOARD(state,board){
            state.board=board;
        },


    },
    actions:{
    Login({commit},{email,password}){
        return api.auth.login(email,password)
        .then(({data})=>{
            const {accessToken}=data;
            const {email}=data.user;
            commit('LOGIN',{accessToken,email});
        })
    },
   async BOARDS_FETCH({commit}){
      try {
         const res =await api.board.fetch();
         commit('SET_BOARDlIST',res.data.list)
         return res;
      } catch (error) {
          console.log(error)

      }
  
    },
   async BOARD_FETCH({commit},id){
      try {
         const res =await api.board.fetch(id);
        commit('SET_BOARD',res.data.item)
         return res;
      } catch (error) {
          console.log(error)

      }
  
    },
    async CREATE_BOARD(_,{title}){
        try {
          const {data}= await api.board.create(title);
          return data.item;
        } catch (error) {
            console.log(error)
        }
    },
    async UPDATE_BOARD(_,{id,title}){
        try {
        await api.board.update(id,title);
          } catch (error) {
              console.log(error)
          }
    },
    async CREATE_CARD(_,{title,listId}){
        try {
          await api.card.create(title,listId);
        } catch (error) {
            console.log(error)
        }
    }
}
})

export default store;