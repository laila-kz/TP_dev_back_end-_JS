<template>
    <div>
        <h3> Tags</h3>
        <div v-for="tag in uniqueTags" :key="tag">
            <router-link :to="`/tags/${tag}`"> #{{ tag }}</router-link>
        </div>
    </div>
</template>

<script setup>
defineProps ({posts: Array})
import {ref,computed, onMounted } from 'vue';
import usePosts from '../composables/getPosts.js';
const props = defineProps({
    posts: Array
})

const posts = ref([])
const uniqueTags =  computed(() => {
    const all = props.posts.flatMap(p => p.tags || [])
    return [...new Set(all)]
})

onMounted (async () => {
    try{
        posts.value = await usePosts();
        //get dup tags
        const allTags = posts.value.flatMap(post => post.tags || []);
        uniqueTags.value= [...new Set(allTags)]
    }catch(err){
        console.error('Error loading tags', err) // EDIT: added error handling
        uniqueTags.value = []
}
    
});




</script>