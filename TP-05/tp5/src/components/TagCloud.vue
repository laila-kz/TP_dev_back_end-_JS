<template>
    <aside class="sideBar">
        <h3>Tags</h3>
        <div class="tags-list">
            <router-link v-for="tag in uniqueTags" :key="tag" :to="`/tags/${tag}`" class="tag">#{{ tag }}</router-link>
        </div>
    </aside>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import usePosts from '../composables/getPosts.js';

const props = defineProps({
    posts: { type: Array, default: () => [] }
})

const posts = ref([])

const sourcePosts = computed(() => (props.posts && props.posts.length) ? props.posts : posts.value)

const uniqueTags = computed(() => {
    const all = sourcePosts.value.flatMap(p => p.tags || [])
    return [...new Set(all)]
})

onMounted(async () => {
    try {
        posts.value = await usePosts();
    } catch (err) {
        console.error('Error loading tags', err)
    }
})

</script>