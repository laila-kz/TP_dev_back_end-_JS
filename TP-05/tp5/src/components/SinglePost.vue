<template>
    <div v-if="loading"> Loading Posts .........</div>
    <div v-else-if="error"> {{ error }}</div>
    <div v-else>
        <div v-if="post">
                <h3> {{ post.title }}</h3>
                <p>{{ post.body }}</p>
                <p>{{ post.tag }}</p>
        </div>
        <div v-else> Post not existent / not found</diV>
    </div>
</template>

<script setup>
import usePost from '../composables/getPost.js';
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router'; 


const route = useRoute();
const post = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async()=>{
    try{
        const postId = route.params.id;
        post.value = await usePost(postId);
    }catch(err){
        error.value = err.message
    }finally {
        loading.value = false;
    }
});
</script>