<template>
    <div class="col-9"><AddWord></AddWord></div>
</template>

<script setup>
import AddWord from "~/components/AddWord.vue";
import { useStore } from "~/store/words";
import { storeToRefs } from 'pinia';

const wordsStore = useStore();
const { words } = storeToRefs(wordsStore);

const hasWords = () => {
    return words.length;
}

onMounted(() => {
    wordsStore.getWords();
})
</script>

<style scoped>
</style>