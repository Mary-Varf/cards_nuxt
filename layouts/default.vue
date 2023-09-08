<template>
    <div class="container">
        <AppHeader></AppHeader>

        <slot></slot>
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