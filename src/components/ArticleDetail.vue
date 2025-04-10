<template>
    <article>
        <slot name="header"></slot>
        <header>{{ article.title }}</header>
        <p>{{  article.body }}</p>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </article>
</template>

<script setup lang="ts">
import type { Article } from '../types/article';

defineProps<{
    article: Article
}>()
</script>