<template>
    <div class="container">
        <AppHeader></AppHeader>
        <div class="row">
            <div class="col-3"><AppNavigation></AppNavigation></div>
            <div class="col-9"><slot></slot></div>
        </div>
    </div>
</template>

<script setup>
import AppNavigation from "~/components/AppNavigation.vue";
import AppHeader from "~/components/AppHeader.vue";
import { useStore } from "~/store/words";

const wordsStore = useStore();

onMounted(() => {
    wordsStore.getWords();
})
</script>

<style scoped>
</style>