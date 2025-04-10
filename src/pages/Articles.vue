<template>
    <h1>Articles</h1>
    
    <Transition name="fade" mode="out-in">
        <div v-if="loading">
        Loading articles
        </div>
        <div v-else>
            <Suspense>
                <template #default>
                    <AsyncArticleDetail :article v-for="article in articles">
                        <template #header>
                            <h1>Titre</h1> 
                        </template>
                        <template #default>
                            default
                        </template>
                        <template #footer>
                            <p>Footer</p>
                        </template>
                    </AsyncArticleDetail>
                </template>
                <template #fallback>
                    <p>Loading article detail</p>
                </template>
            </Suspense>
        </div>
    </Transition>
   
</template>

<script setup lang="ts">
import axios from 'axios';
import { defineAsyncComponent, onMounted, ref } from 'vue';
import type { Article } from '../types/article';

const AsyncArticleDetail = defineAsyncComponent({
    loader: () => import('../components/ArticleDetail.vue').then((comp) => {
        return new Promise((resolve: any) => {
            setTimeout(() => {
                resolve(comp)
            }, 5000)
        })
    }),
    delay: 200,
    timeout: 5000,
    errorComponent: () => import('../components/ErrorComponent.vue'),
    onError(error, retry, fail, attempts) {
        if (attempts < 3) {
            console.log('retry attempt', attempts)
            retry()
        }
        else {
            console.error('Failed', error)
            fail()
        }
    }
})

const articles = ref<Article[]>([])
const loading = ref(false)

onMounted(async () => {
    loading.value = true
    const res = await axios('https://jsonplaceholder.typicode.com/posts')
    await new Promise((resolve: any) => {
        setTimeout(resolve, 5000)
    })
    articles.value = res.data
    loading.value = false
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
 </style>