<template>
    <div class="card__container p-2">
        <div class="card mx-auto" style="width: 18rem;" v-if="randomWord"
             ref="card"
             @click="turnCard"
        >
            <img :src="randomWord.img" class="card-img-top" alt="...">
            <div class="card-body text-md-center">
                <h3 class="card-text">{{ text }}</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from "~/store/words";

const wordsStore = useStore();
const { words, randomWord } = storeToRefs(wordsStore);
const card = ref(null);
const text = ref(null);

const turnCard  = () => {
    toggleClass();
    changeText(randomWord.translation);
}

const changeText = (newText) => {
    text.value = newText;
}

const toggleClass = () => {
    nextTick(() => {
        console.log(card.value.classList.toggle('turn'))
    });
}

onMounted(() => {
    wordsStore.getWords();
    changeText(randomWord.word);
})
</script>

<style scoped>
    .card__container {
        height: 100vh;
        width: 100%;
    }
    .card {
        transition: all 0.5s;
    }
    .card.turn {
        transform: rotateY(360deg) perspective(200px);
    }
</style>