<template>
    <div class="card mx-auto default-card" style="width: 18rem;">
        <div class="card-img-top"></div>
        <div class="card-body text-md-center">
            <h3 class="card-text"></h3>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from "~/store/words";

const wordsStore = useStore();
const { words, randomWord } = storeToRefs(wordsStore);
const card = ref(null);
const isMainCardSide = ref(true);
const text = ref(null);
</script>

<style scoped>
</style>