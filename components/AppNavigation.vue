<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 flex-column">
                    <li class="nav-item">
                        <NuxtLink to="/" class="nav__link" aria-current="page">Home</NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink to="/" class="nav__link" aria-current="page">Home</NuxtLink>
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

</script>

<style scoped>
.router-link-exact-active {
    color: #755BB4;
}
.nav__link {
    text-decoration: none;
}
.nav-item {
    width: 100%;
    padding: 5px 10px;
    margin: 5px 0;
    border-left: 2px solid #755BB4;
}
</style>