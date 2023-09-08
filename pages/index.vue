<template>
        <AppCard></AppCard>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import AppCard from "~/components/AppCard.vue";
import { useStore } from "~/store/words";

const wordsStore = useStore();
const { words } = storeToRefs(wordsStore);


const updateCard = () => {
    wordsStore.setRandomWord();
}
</script>

<style scoped>
</style>