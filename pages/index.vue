<template>
    <div class="col-9">
        <AppCard></AppCard>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import AppCard from "~/components/AppCard.vue";
import { useStore } from "~/store/words";

const wordsStore = useStore();
const { words } = storeToRefs(wordsStore);


const updateCard = () => {

}
</script>

<style scoped>
</style>