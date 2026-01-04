<template>
    <div>
        <div v-if="loading" class="loading">Loading posts...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else class="post-list">
            <ul>
                <li v-for="post in posts" :key="post.id">
                    <h3>{{ post.title }}</h3>
                    <p>{{ post.body.substring(0, 150) }}...</p>
                    <router-link :to="`/post/${post.id}`">Read more</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
    // import {ref , onMounted }from 'vue';
    // import usePosts from '../composables/getPosts';

    // const posts= ref([]);
    // const loading = ref(true);
    // const error = ref(null );


    // onMounted(async()=>{
    //     try{
    //         posts.value = await usePosts();

    //     }catch(err){
    //         error.value = err.message;
    //     }finally{
    //         loading.value = false ;
    //     }
    // })

    import { defineProps } from 'vue'

    const props = defineProps({
        posts: {
            type: Array,
            default: () => [] // accept posts prop from parent
        },
    })


</script>