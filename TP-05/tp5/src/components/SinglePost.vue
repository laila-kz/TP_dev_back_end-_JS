<template>
    <div>
        <div v-if="loading" class="loading">Loading post...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else class="post-detail">
            <div v-if="post">
                <h1>{{ post.title }}</h1>
                <div class="post-meta">By {{ post.author || 'Unknown' }} — {{ post.date || '' }}</div>
                <div class="post-content">{{ post.body }}</div>
                <div class="post-tags">
                    <div class="tags-list">
                        <span v-for="t in (post.tags || [])" :key="t" class="tag">{{ t }}</span>
                    </div>
                </div>
            </div>
            <div v-else>Post not found</div>
        </div>
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