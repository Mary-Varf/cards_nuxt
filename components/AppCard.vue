<template>
    <div class="card__container p-2">
        <button v-if="randomWord" @click="updateCard">New Card</button>
        <button class="play" @click="play">Play</button>
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
import { storeToRefs } from 'pinia';
import DefaultCard from "~/components/DefaultCard.vue";
import { useStore } from "~/store/words";

const wordsStore = useStore();
const { words, randomWord } = storeToRefs(wordsStore);
const card = ref(null);
const isMainCardSide = ref(true);
const text = ref(null);

const updateCard = () => {
    wordsStore.setRandomWord();
}
let speech;
// const handleSpeak = () => {
//     console.log()
// }
let isChrome;
let voices = [];
let isFirefox;
onMounted(() => {
speech = window.speechSynthesis;
// Firefox 1.0+
isFirefox = typeof InstallTrigger !== 'undefined';

// Chrome 1+
isChrome = !!window.chrome && !!window.chrome.webstore;

})
function play() {

    const getVoices = () => {
        voices = speech.getVoices();
        console.log(voices);

        // // Loop through voices and create an option for each one
        voices.forEach(voice => {
            //     // Create option element
            //     const option = document.createElement('option');
            //     // Fill option with voice and language
            //     option.textContent = voice.name + '(' + voice.lang + ')';
            //
            //     // Set needed option attributes
            //     option.setAttribute('data-lang', voice.lang);
            //     option.setAttribute('data-name', voice.name);
            //     voiceSelect.appendChild(option);
        });
    };

    if (isFirefox) {
        getVoices();
    }
    if (isChrome) {
        if (speech.onvoiceschanged !== undefined) {
            speech.onvoiceschanged = getVoices;
        }
    } else {
        getVoices()
    }
    if (speech?.speaking) {
        alert("Alredy Speaking");
        return;
    }
    let msg = new SpeechSynthesisUtterance(randomWord.translation)
    const selectedVoice = 'Google español';
    //
    voices.forEach(voice => {
        if (voice.name === selectedVoice) {
            msg.voice = voice;
        }
    });
    speech.speak(msg);
};

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