<template>
    <div>
        <div class="card" v-for="card in cards"
            :class="{opening: card.opening, found: card.found }"
            @click="_openCard(card)">
            <div class="back"></div>
            <div class="front" :style="{ backgroundImage: 'url(' + card.image + ')' }"></div>
        </div>
    </div>
</template>

<script>
import {bus} from '../main';
export default {
    name: 'card',
    props: {
      cards: {
        type: Array,
        required: true
      }
    },
    data(){
        return {}
    },
    methods: {
        setFound: function(card){
            card.found = true;
        },
        _openCard: function(card) {
            if (card.found || card.opening) return;
            let openCount = this.$parent.getOpeningCards().length;
            // open the first card
            if (openCount == 0) {
                card.opening = !card.opening;
            }

            // open the second card
            else if (openCount == 1) {
                card.opening = !card.opening;
                this.$emit('_processOpenCard', card);
            }
        }
    },
    created(){
        bus.$on('_setFound', (card) => {
            this.setFound(card);
        });
    }
}
</script>

<style>
.card {
    position: relative;
    display: inline-block;
    width: 120px;
    height: 120px;
    margin: 10px;
}
.card .front, .card .back {
    border: 1px solid #dadada;
    border-radius: 5px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: White;
}
.card .back {
    background-color: #dadada;
    font-size: 12px;
}
.card .back:hover {
    background: #b3b3b3;
    cursor: pointer;
}
.card .front {
    background-size: 90%;
    background-repeat: no-repeat;
    background-position: center;
    display: none;
}
.card.opening .back, .card.found .back {
    display: none;
}
.card.opening .front, .card.found .front {
    display: block;
}
.card.found {
    opacity: 0.3;
}
</style>