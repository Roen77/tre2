<template>
    <div class="list">
        <div class="title">{{list.title}}</div>
        <!-- card-lsit -->
        <div class="card-container">
            <!-- <li v-for="card in list.cards" :key="card.id">
                {{card}}
            </li> -->
            <transition-group name="ani" tag="ul">
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
import addCard from './addCard.vue'
import CardList from './CardList.vue'

export default {
  components: { addCard, CardList},
    props:{
        list:{
            type:Object,
            required:true
        }
    },
    data() {
        return {
            isEditCard: false
        }
    },
    methods: {
        EditCARD() {
            this.isEditCard=true;
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