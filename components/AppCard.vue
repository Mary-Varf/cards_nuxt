<template>
    <div class="card__container p-2">
        <button v-if="randomWord" @click="updateCard">New Card</button>
        <div v-if="randomWord"
             ref="card"
             class="flipcard"
             @click="turnCard">
            <div class="card mx-auto front" style="width: 18rem;">
                <img :src="randomWord.img" class="card-img-top">
                <div class="card-body text-md-center">
                    <div class="d-flex justify-content-center gap-2 align-items-center">
                        <h3 class="card-text">{{ randomWord.wordInEn }}</h3>
                        <button class="btn" @click="play(randomWord.wordInEs)">
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke="#000000" stroke-width="2" stroke-linejoin="round"></path> </g></svg>
                        </button>
                    </div>
                    <h3 class="card-text">{{ randomWord.wordInRu }}</h3>
                </div>
            </div>

            <div class="card mx-auto back" style="width: 18rem;">
                <img :src="randomWord.img" class="card-img-top">
                <div class="card-body text-md-center">
                    <h3 class="card-text">{{ randomWord.wordInEs }}</h3>
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
function play(wordToSpeak) {
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
    console.log(wordToSpeak)
    let msg = new SpeechSynthesisUtterance(wordToSpeak)
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
        height: 330px;
        box-sizing: border-box;
        transition: all 0.5s ease-in;
        padding: 10px;
        backface-visibility: hidden;
    }

    .flipcard img
    {
        width:100%;
        height: 200px;
        object-fit: cover;
    }
</style>