<template>
    <div class="cards">
        <app-button v-bind:title="btnTitle"></app-button>
        <app-card v-bind:cards="cards" v-on:_processOpenCard="processOpenCard($event)"></app-card>
    </div>
</template>

<script>
import Card from './Card.vue';
import Button from './Button.vue';
import {bus} from '../main';

let CardList = [
  { name: "aaa", image: "/common/images/aaa.png" },
  { name: "bbb", image: "/common/images/bbb.png" },
  { name: "ccc", image: "/common/images/ccc.png" },
  { name: "ddd", image: "/common/images/ddd.png" },
  { name: "eee", image: "/common/images/eee.png" },
  { name: "fff", image: "/common/images/fff.png" },
  { name: "ggg", image: "/common/images/ggg.png" },
  { name: "hhh", image: "/common/images/hhh.png" },
  { name: "zzz", image: "/common/images/zzz.png" }
];

let shuffleCards = () => {
  let cards = [].concat(_.cloneDeep(CardList), _.cloneDeep(CardList));
  return _.shuffle(cards);
}

export default {
    name: 'cards',
    components: {
        'app-card': Card,
        'app-button': Button
    },
    data() {
        return {
            btnTitle: 'Restart Game',
            openTimeout: null,
            cards: []
        }
    },
    methods: {
        startGame() {
            let cards = shuffleCards();
            cards.forEach(function(card) {
                card.opening = false;
                card.found = false;
            });
            this.cards = cards;
        },
        clearOpening() {
            _.map(this.cards, card => card.opening = false);
        },
        processOpenCard(card) {
            // ----- check the same card
            let isSame = this.isCheckSameCard();
            this.processSameCard(isSame);
        },
        getOpeningCards() {
            let value = [];
            this.cards.forEach(function(card) {
                if (card.opening == true) value.push(card);
                if (value.length ==2) return value;
            });
            return value;
        },
        processSameCard(flag) {
            let callback = function(_this, _flag) {
                if (_flag) _this.setCardFounds();
                _this.clearOpening();
            }
            setTimeout(callback, 1000, this, flag);
        },
        isCheckSameCard() {
            let openingCards = this.getOpeningCards();
            if (openingCards.length == 2){
                if (openingCards[0].name == openingCards[1].name)
                    return true;
            }
            return false;
        },
        setCardFounds() {
            let openingCards = this.getOpeningCards();
            openingCards.forEach(function(card) {
                bus.$emit('_setFound', card);
            });
        },

    },
    created() {
        this.startGame();
        bus.$on('restartGame', () => {
            this.startGame();
        });
    }
}
</script>
<style>
.cards {
    width: 845px;
    margin: auto;
}
.btn {
    color: #ffffff;
    font-size: 11px;
    background: #2570a1;
    padding: 7px 10px 7px 10px;
    text-decoration: none;
    border-radius: 5px;
    margin: 0px 0px 10px 10px;
}

.btn:hover {
    background: #165b80;
    text-decoration: none;
    cursor: pointer;
}
</style>