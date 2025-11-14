<template>
    <div>
        <h2>Job Detail</h2>
        <div v-if="job">
            <h3>{{ job.title }}</h3>
            <p><strong>Company:</strong> {{ job.company }}</p>
            <p><strong>Salary:</strong> {{ job.salary }}</p>
            <p><strong>Location:</strong> {{ job.location }}</p>
            <p><strong>Type:</strong> {{ job.type }}</p>
            <p><strong>Category:</strong> {{ job.category }}</p>
            <p><strong>Experience Years:</strong> {{ job.experienceYears || job.yearsExperience }}</p>
            <p><strong>Skills:</strong> {{ job.skills }}</p>
            <p><strong>Description:</strong> {{ job.description }}</p>
            <p><em>Posted:</em> {{ job.createdDate }}</p>

            <button @click="goToEdit">Edit Job</button>
            <button @click="deleteJob">Delete Job</button>
        </div>
        <div v-else>
            <p>Loading job details...</p>
        </div>
    </div>
</template>

<!-- Fetch and display complete job details

Show edit and delete buttons

Handle delete confirmation and deletion

Navigate to EditJob page -->

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    name: 'JobDetail',
    setup() {
        const route = useRoute();
        const router = useRouter();
        const job = ref(null);

        onMounted(async () => {
            const jobId = route.params.id;
            try {
                const response = await fetch(`http://localhost:3000/jobs/${jobId}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const jobData = await response.json();
                job.value = jobData;
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        });

        const deleteJob = async () => {
            if (!job.value) return;
            const confirmed = confirm('Are you sure you want to delete this job?');
            if (!confirmed) return;
            try {
                const res = await fetch(`http://localhost:3000/jobs/${job.value.id}`, {
                    method: 'DELETE'
                });
                if (!res.ok) throw new Error('Failed to delete job');
                alert('Job deleted successfully!');
                router.push('/');
            } catch (error) {
                console.error('Error deleting job:', error);
            }
        };

        const goToEdit = () => {
            if (job.value) router.push(`/edit-job/${job.value.id}`);
        };

        return { job, deleteJob, goToEdit };
    }
};
</script>