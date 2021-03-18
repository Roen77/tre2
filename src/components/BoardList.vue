<template>
    <div class="list" :data-list-id="list.id" :data-list-pos="list.pos">
        <div v-if="!isEditTitle" @click="onClickTitle" class="title">{{list.title}}</div>
        <div v-else><input type="text" v-model="input" ref="inputTitle" @blur="onBlurTitle" @keyup.enter="onSubmitTitle"></div>
        <!-- card-lsit -->
        <div class="card-container">
            <!-- <li v-for="card in list.cards" :key="card.id">
                {{card}}
            </li> -->
            <transition-group name="ani" class="card-wrapper" :data-list-id="list.id" tag="ul">
            <card-list v-for="card in list.cards" :key="card.id"        :card="card"></card-list>
            </transition-group >
        </div>
        <!-- addCard -->
            <div v-if="isEditCard"><add-card @close="isEditCard=false" :listId="list.id"></add-card></div>
            <div v-else>
                <div class="add_btn"><a href="#" @click.prevent="EditCARD">add CARD..</a></div>
            </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import addCard from './addCard.vue'
import CardList from './CardList.vue'

export default {
  components: { addCard, CardList},
    props:{
        list:{
            type:Object,
            required:true,
            input:''
        }
    },
    created(){
        this.input=this.list.title
    },
    data() {
        return {
            isEditCard: false,
            isEditTitle:false,
        }
    },
    methods: {
        ...mapActions(['UPDATE_LIST']),
        EditCARD() {
            this.isEditCard=true;
        },
        onClickTitle(){
            this.isEditTitle=true;
            this.$nextTick(()=>this.$refs.inputTitle.focus())
        },
        onBlurTitle(){
            this.isEditTitle=false;
        },
        onSubmitTitle(){
            this.onBlurTitle();
            this.input=this.input.trim();
            if(!this.input)return
            const id=this.list.id;
            const title=this.input;
            if(title === this.list.title) return
             this.UPDATE_LIST({id,title})
        }
    },
}
</script>

<style scoped>
.list{background-color: rgba(65, 105, 225, 0.863);}
.title{color:#fff; font-size: 18px; font-weight: bold; padding: 7px; box-sizing: border-box;}
.add_btn a{
    display: block;
    color:#fff; text-decoration: none;
    padding: 10px;
    box-sizing: border-box;
}
.add_btn a:hover{
    background-color: dodgerblue;
}
.ani-enter-active,
.ani-leave-active{
    transition: all 0.5s;
}
.ani-enter,
.ani-leave-to{
    transform: translateY(30px);
    opacity: 0;
}
</style>