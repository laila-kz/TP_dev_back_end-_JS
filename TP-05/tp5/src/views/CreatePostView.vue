<template>
        <div>
            <h1>Create New Post</h1>
            <form @submit.prevent="handleSubmit" class="post-form">
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
            <button type="submit" :disabled="loading" class="btn-primary">
            {{ loading ? 'Creating...' : 'Create Post' }}
            </button>
            <button type="button" @click="cancel" class="btn-secondary">
            Cancel
            </button>
        </div>

        <div v-if="error" class="error-message">
            {{ error }}
        </div>
        </form>
    </div>
        


</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter ()
const loading = ref(false)
const error = ref('')

const form = ref({
    title: '',
    body :'',
    tagsInput:''
})


const handleSubmit = async()=>{
    loading.value = true
    error.value = ''
    try {
        //split tags by commas and trim
        const tags = form.value.tagsInput.split(',').map(tag=>tag.trim()).filter(tag => tag.length>0)
        const postData ={
            title: form.value.title,
            body: form.value.body,
            tags: tags,
            createdAt: new Date().toISOString(),
            id: Date.now()  //temporary id

        }
        const response = await fetch('http://localhost:3000/posts',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        })

        if(!response.ok){
            throw new Error('Failed to create post')
        }
        //back to home
        router.push('/')

    }catch(err){
        error.value = err.message

    }finally{
        loading.value = false
    }

}
//in case canceled load the home page
    const cancel =()=>{
        router.push('/')
    }
</script>