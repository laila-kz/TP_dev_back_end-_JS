
<template>
    <div class="container">
        <h2>Blog Posts</h2>
        <div class="home-container">
            <div class="main-content">
                <div v-if="loading" class="loading">Loading posts...</div>
                <div v-else-if="error" class="error">{{ error }}</div>
                <div v-else>
                    <PostList :posts="filteredPosts" class="post-list"/>
                </div>
            </div>
            <div class="sideBar">
                <TagCloud :posts="posts" @tag-selected="filterByTag"/>
                <button v-if="currentTag" @click="clearFilter" class="clear-filter">Clear Filter</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import NavBar  from '../components/NavBar.vue';
import PostList from '../components/PostList.vue';
import {useRoute , useRouter} from 'vue-router';
import TagCloud from '../components/TagCloud.vue';
import usePosts from '../composables/getPosts.js';
import {ref, onMounted, computed} from 'vue';


const posts = ref([])
const loading =ref(true)
const error =ref(null)
const currentTag = ref('')
const route = useRoute()
const router = useRouter ()

//fetch posts
onMounted(async () => {
    try{
        posts.value = await usePosts();
        //check for the tags
        if(route.params.tag){
            currentTag.value = route.params.tag
        }
    }catch(err){
        error.value = err.message
    }finally{
        loading.value = false

    }
})

//filter the posts by tgs
const filteredPosts= computed(()=>{
    if(!currentTag.value){
        return posts.value
    }
    return posts.value.filter(post=>
        post.tags && post.tags.includes(currentTag.value)

    )
})

//filter post by selected tag
const filterByTag =(tag)=>{
    currentTag.value= tag
    router.push(`/tags/${tag}`)
}

//clear tag filter
const clearFilter=()=>{
    currentTag.value =''
    router.push('/')
}



</script>