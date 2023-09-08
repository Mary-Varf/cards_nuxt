<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    @click="toggleMenu"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse align-self-center" :class="{'menu__mobile': isOpenMenu}">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex md:flex-column">
                    <li class="nav-item">
                        <NuxtLink to="/" class="nav__link" aria-current="page">Home</NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink to="/add_word" class="nav__link" aria-current="page">Add New Word</NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink to="/" class="nav__link" aria-current="page">Home</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
const isOpenMenu = ref(false);
const toggleMenu = () => {
    isOpenMenu.value = !isOpenMenu.value;
}
</script>

<style scoped>
.navbar {
    width: 100%;
}
.router-link-exact-active {
    color: #755BB4;
}
.nav__link {
    text-decoration: none;
    white-space: nowrap;
}
.nav-item {
    width: 100%;
    padding: 5px 10px;
    margin: 5px 0;
    border-left: 2px solid #755BB4;
}
.menu__mobile {
    z-index:100;
    background-color: white;
    display: flex;
    position: absolute;
    top: 60px;
    left:0;
}
</style>