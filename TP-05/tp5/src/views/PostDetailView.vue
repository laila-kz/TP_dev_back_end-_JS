<template>
<div class="post-detail">
    <div v-if="loading" class="loading">Loading post...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="post">
        <div>
            <h1>{{ post.title }}</h1>
            <div>
                <button @click="editPost">Edit Post</button>
                <button @click="deletePost"> Delete Psot</button>
            </div>
        </div>
        <div>
            <span>
                Created: {{ formatDate(post.createdAt) }}
            </span>
        </div>
        <div>
            <p>{{ post.body }}</p>
        </div>
        
        <div v-if="post.tags && post.tags.length" class="post-tags">
        <h3>Tags:</h3>
        <div class="tags-list">
            <span v-for="tag in post.tags" :key="tag" class="tag">
                #{{ tag }}
            </span>
            </div>
            </div>
            <div class="navigation">
            <router-link to="/" class="btn-back">← Back to Posts</router-link>
        </div>
        </div>
        <div v-else class="not-found">
        <h2>Post not found</h2>
        <router-link to="/" class="btn-back">Back to Home</router-link>
        </div>
        <div class="sidebar">
        <TagCloud :posts="[post]" v-if="post" />
        </div>
    </div>




</template>
<script setup>
import {ref , onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router'
import TagCloud from '../components/TagCloud.vue'
import usePost from '../composables/getPost.js'

const route = useRoute()
const router = useRouter ()
const post = ref(null)
const error = ref('')
const loading = ref(true)

onMounted(async () => {
    try{
        const postId = route.params.id 
        post.value = await usePost(postId)
    }catch(err){
        error.value = err.message

    }finally{
        loading.value = false
    }
    
})

const editPost =()=>{
    if(post.value){
        router.push(`/edit/${post.value.id}`)
    }
}

const deletePost= async () => {
    if(!post.value || !confirm('Are you sure you want to delete this post?'))
{return}
    try{
        const response = await fetch(`http://localhost:3000/posts/${post.value.id}`,{
            method: 'DELETE'
        })
        if(!response.ok){
            throw new Error('failed to delete post ')
        }
        router.push('/') //load back home

    }catch(err){
        error.value = err.message
    }
}

const formatDate=(dateString)=>{
    return new Date(dateString).toLocaleDateString(
        'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    )
}


</script>