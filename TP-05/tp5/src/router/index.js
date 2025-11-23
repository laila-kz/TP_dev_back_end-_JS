
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CreatePostView from '../views/CreatePostView.vue';
import PostDetailView from '../views/PostDetailView.vue';
import EditPostView from '../views/EditPostView.vue';







const routes =[
    { path: '/', name: 'Home', component: Home },
    { path: '/create', name: 'CreatePostView', component: CreatePostView },
    { path: '/post/:id', name: 'PostDetailView', component: PostDetailView },
    { path: '/edit/:id', name: 'EditPostView', component: EditPostView },
    { path: '/tags/:tag', name: 'TagPosts', component: Home }

]

const router =createRouter({
    history : createWebHistory(),
    routes 
})
export default router;