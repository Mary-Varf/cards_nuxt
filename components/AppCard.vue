<template>
    <div class="card__container p-2">
        <div v-if="randomWord"
             ref="card"
             class="flipcard"
             @click="turnCard">
            <div class="card mx-auto front" style="width: 18rem;">
                <img :src="randomWord.img" class="card-img-top" :alt="getCardText()">
                <div class="card-body text-md-center">
                    <h3 class="card-text">{{ randomWord.word }}</h3>
                </div>
            </div>

            <div class="card mx-auto back" style="width: 18rem;">
                <img :src="randomWord.img" class="card-img-top" :alt="getCardText()">
                <div class="card-body text-md-center">
                    <h3 class="card-text">{{ randomWord.translation }}</h3>
                </div>
            </div>
        </div>


        <DefaultCard v-else></DefaultCard>
    </div>
</template>

<script setup>
import DefaultCard from "~/components/DefaultCard.vue";
import { storeToRefs } from 'pinia';
import { useStore } from "~/store/words";

const wordsStore = useStore();
const { words, randomWord } = storeToRefs(wordsStore);
const card = ref(null);
const isMainCardSide = ref(true);
const text = ref(null);


const toggleStateMainCardSide = () => {
    isMainCardSide.value = !isMainCardSide.value;
}

const turnCard  = () => {
    toggleStateMainCardSide();
    toggleClass();
}

const getCardText = () => {
    return isMainCardSide ? randomWord.word : randomWord.translation;
}

const toggleClass = () => {
    nextTick(() => {
        console.log(card.value.classList.toggle('turn'))
    });
}
</script>

<style scoped>
    .card__container {
        height: 100vh;
        width: 100%;
    }
    .card {
        transition: rotateY 0.5s, perspective 0.5s;
        background-color: white;
    }
    .card.turn {
        transform: rotateY(180deg) perspective(200px);
    }

    .flipcard {
        position: relative;
        perspective: 500px;
        float:left;
        width: 100%;
    }

    .flipcard.turn .front, .flipcard.flip .front{
        transform: rotateX(180deg);
    }
    .flipcard.turn .back, .flipcard.flip .back{
        transform: rotateX(0deg);
    }
    .flipcard .back{
        transform: rotateX(-180deg);
    }
    .flipcard.turn .front, .flipcard.flip .front{
        transform: rotateY(180deg);
    }
    .flipcard.turn .back, .flipcard.flip .back{
        transform: rotateY(0deg);
    }
    .flipcard .back{
        transform: rotateY(-180deg);
    }
    .flipcard .front, .flipcard .back
    {
        position:absolute;
        width: 100%;
        height:300px;
        box-sizing: border-box;
        transition: all 0.5s ease-in;
        padding: 10px;
        backface-visibility: hidden;
    }

    .flipcard img
    {
        width:100%;
        height:200px;
    }
</style>