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
        bodyColor:'#fff',
        navbarColor:'royalblue',
        isshow:false
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
        },
        SET_THEME(state,color){
            state.bodyColor=color || '#fff';
            state.navbarColor=color ?'royalblue':'#crimson';
        },
        SET_SETTING(state,toggle){
            state.isshow=toggle;
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
    async UPDATE_BOARD(_,{id,title,bgColor}){
        try {
            console.log('updataboard ~~~~~')
        await api.board.update(id,title,bgColor);
          } catch (error) {
              console.log(error)
          }
    },
    async DELETE_BOARD(_,id){
        try {
            await api.board.delete(id)
        } catch (error) {
            console.error(error)
        }
    },
    async ADD_LIST({dispatch,state},{title,boardId,pos}){
       try {
           await api.list.create({title,boardId,pos})
           dispatch('BOARD_FETCH',state.board.id)
       } catch (error) {
           console.error(error)
       }   
    },
    async UPDATE_LIST({dispatch,state},{id,pos,title}){
         await api.list.update(id,{pos,title})
        dispatch('BOARD_FETCH',state.board.id)
    },
    async FETCH_CARD({commit},{id}){
        try {
            const res =await api.card.fetch(id)
            commit('SET_CARD',res.data.item)
        } catch (error) {
            console.error(error);
        }
    },

     async CREATE_CARD({dispatch,state},{title,listId,pos}){
         try {
            await api.card.create(title,listId,pos);
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
    },
    async  DELETE_CARD({dispatch,state},id){
        try {
            await api.card.delete(id)
            dispatch('BOARD_FETCH',state.board.id)
        } catch (error) {
            console.error(error)
        }
    }
}
})

export default store;