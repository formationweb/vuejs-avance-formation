<template>
    <!-- Utilisation basique -->
    <img v-lazyload="'https://picsum.photos/seed/picsum/200/300'" alt="Description" />

    <!-- Utilisation avancée avec options -->
    <img v-lazyload="{
    src: 'https://picsum.photos/seed/picsum/200/300',
    placeholder: 'https://placehold.co/600x400',
    effect: 'fade',
    }" alt="Description" />
</template>