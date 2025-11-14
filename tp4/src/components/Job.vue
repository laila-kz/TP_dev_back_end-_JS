<template>
    <div class="job">
        <h2>{{ job.title}}</h2>
        <p class="company">{{ job.company }}</p>
        <p class="location">{{ job.location }}</p>
        <p class="description">{{ job.description }}</p>
        <div class="plus-infos">
            <span>{{job.type}}</span>
            <span>{{job.salary}}</span>
            <!-- <span>{{job.postedDate}}</span> -->
            <span>{{job.experienceYears}}</span>
            <span>{{job.createdDate}}</span>
        </div>
        <div class="actions">
            <router-link :to="`/jobs/${job.id}`" >View Details</router-link>
            <router-link :to="`/edit-job/${job.id}`">Edit Job</router-link>
            <button @click="$emit('delete-job', job.id)">Delete Job</button>
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