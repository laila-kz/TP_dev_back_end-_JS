<template>
    <div class="job">
        <div class="content">
            <h2>{{ job.title}}</h2>
            <p class="company">{{ job.company }}</p>
            <p class="location">{{ job.location }}</p>
            <p class="description">{{ job.description }}</p>
            <div class="plus-infos">
                <span class="badge">{{job.type}}</span>
                <span class="muted">{{job.salary}} MAD</span>
                <span class="muted">{{job.experienceYears}} yrs</span>
                <span class="muted">{{job.createdDate}}</span>
            </div>
        </div>
        <div class="actions">
            <router-link class="btn btn-secondary" :to="`/jobs/${job.id}`" >View</router-link>
            <router-link class="btn btn-secondary" :to="`/edit-job/${job.id}`">Edit</router-link>
            <button class="btn btn-danger" @click="$emit('delete-job', job.id)">Delete</button>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'Job',
        props: {
            job: {
                type: Object,
                required: true
            }
        }
    }
</script>