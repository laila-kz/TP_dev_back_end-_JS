<template>
    <div>
        <h1>Edit post</h1>
        <div v-if="loading"> Loading ..........</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <form v-else-if="post" @submit.prevent="handleSubmit">
            <div class="form-group">
            <label for="title">Title:</label>
            <input
            type="text"
            id="title"
            v-model="form.title"
            required
            placeholder="Enter post title"
            />
        </div>

        <div class="form-group">
            <label for="body">Content:</label>
            <textarea
            id="body"
            v-model="form.body"
            required
            rows="10"
            placeholder="Write your post content here..."
            ></textarea>
        </div>

        <div class="form-group">
            <label for="tags">Tags (comma-separated):</label>
            <input
            type="text"
            id="tags"
            v-model="form.tagsInput"
            placeholder="vue, javascript, webdev"
            />
            <small>Separate multiple tags with commas</small>
        </div>

        <div class="form-actions">
            <button type="submit" :disabled="updating" class="btn-primary">
            {{ updating ? 'Updating...' : 'Update Post' }}
            </button>
            <button type="button" @click="cancel" class="btn-secondary">
            Cancel
            </button>
            <button type="button" @click="viewPost" class="btn-view">
            View Post
            </button>
        </div>

        <div v-if="updateError" class="error-message">
            {{ updateError }}
        </div>
        </form>
        <div v-else class="not-found">
        <h2>Post not found</h2>
        <router-link to="/" class="btn-back">Back to Home</router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import usePost from '../composables/getPost.js'

const route = useRoute()
const router = useRouter ()
const post = ref(null)
const error = ref('')
const loading = ref(true)
const updating = ref(false)
const updateError= ref('')

const form= ref({
    title: '',
    body: '',
    tagsInput:''
})
//fecth post data
onMounted (async () => {
    try{
        const postId = route.params.id
        post.value = await usePost(postId)
        if (post.value) {
        form.value = {
            title: post.value.title,
            body: post.value.body,
            tagsInput: post.value.tags ? post.value.tags.join(', ') : ''
        }
    }
    }catch(err){
        error.value = err.message
    }finally{
        loading.value = false
    }
    
})

const handleSubmit= async ()=>{
    updating.value = true
    updateError.value =''

    try{
        const tags = form.value.tagsInput.split(',').map(tag=>tag.trim()).filter(tag=> tag.length> 0)
        const updateData= {
            title: form.value.title,
            body : form.value.body,
            tags: tags,
            updatedAt: new Date().toISOString()

        }
        const response = await fetch(`http://localhost:3000/posts/${post.value.id}`,{
            method :'PATCH',
            headers :{
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(updateData)
        })
        if(!response.ok){
            throw new Error('failed to update post')
        }
        //load back home page 
        router.push(`/post/${post.value.id}`)

    }catch(err){
        updateError.value = err.message
    }finally{
        updating.value = false
    }
}

const cancel =()=>{
    router.push(`/post/${post.value.id}`)
}
const viewPost=()=>{
    router.push(`/post/${post.value.id}`)
}



</script>