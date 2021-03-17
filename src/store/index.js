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
        card:{},
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
        SET_CARD(state,card){
            state.card=card;
        }


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
          console.log('패치가왜안됮...')
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
    async FETCH_CARD({commit},{id}){
        try {
            const res =await api.card.fetch(id)
            commit('SET_CARD',res.data.item)
        } catch (error) {
            console.error(error);
        }
    },
     async CREATE_CARD({dispatch,state},{title,listId}){
         try {
            await api.card.create(title,listId);
            dispatch('BOARD_FETCH',state.board.id)
         } catch (error) {
             console.error(error)
         }
        //  return api.card.create(title,listId)
        //  .then(()=>{
        //     dispatch('BOARD_FETCH',state.board.id)
        //  })
        //  .catch((err)=>{
        //      console.log(err)
        //  })
        
    },
    async UPDATE_CARD({dispatch,state},{id,title,description,pos,listId}){
        try {
           const res= await api.card.update(id,{title,description,pos,listId});
            dispatch('BOARD_FETCH',state.board.id)
            return res;
        } catch (error) {
            console.error(error)
        }
    }
}
})

export default store;