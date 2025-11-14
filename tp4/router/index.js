import { createRouter, createWebHistory } from 'vue-router';
import Home from '../src/components/Home.vue'
import AddJob from '../src/components/AddJob.vue'
import EditJob from '../src/components/EditJob.vue'
import JobDetail from '../src/components/JobDetail.vue'


const routes =[
    { path: '/', name: 'Home', component: Home },
    { path: '/add', name: 'AddJob', component: AddJob },
    { path: '/jobs/:id', name: 'JobDetail', component: JobDetail, props: true },
    { path: '/edit-job/:id', name: 'EditJob', component: EditJob, props: true }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;