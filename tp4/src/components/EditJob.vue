<template>
<h2>Edit a Job</h2>
<div v-if="job.id">
    <form class="form-grid" @submit.prevent="submitEdit">
        <div>
            <label for="title">Job Title:</label>
            <input type="text" id="title" name="title" v-model="job.title" required />
        </div>
        <div>
            <label for="company">Company Name:</label>
            <input type="text" id="company" name="company" v-model="job.company" required />
        </div>
        <div>
            <label for="description">Description:</label>
            <input type="text" id="description" name="description" v-model="job.description" required />
        </div>
        <div>
            <label for="salary">Salary:</label>
            <input type="number" id="salary" name="salary" v-model="job.salary" required />
        </div>
        <div>
            <label for="location">Location:</label>
            <input type="text" id="location" name="location" v-model="job.location" required />
        </div>
        <div>
            <label for="type">Job Type:</label>
            <select id="type" name="type" v-model="job.type" required>
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="remote">Remote</option>
                <option value="on-site">On-Site</option>
                <option value="internship">Internship</option>
            </select>
        </div>
        <div>
            <label for="experienceYears">Experience (Years):</label>
            <input type="number" id="experienceYears" name="experienceYears" v-model="job.experienceYears" required />
        </div>
        <div>
            <label for="skills">Skills (comma separated):</label>
            <input type="text" id="skills" name="skills" v-model="job.skills" required />
        </div>
        <div>
            <label for="category">Category:</label>
            <input type="text" id="category" name="category" v-model="job.category" required />
        </div>
        <div>
            <label for="createdDate">Creation Date:</label>
            <input type="date" id="createdDate" name="createdDate" v-model="job.createdDate" />
        </div>
        <button class="btn btn-primary" type="submit">Update Job</button> 
        <router-link class="btn btn-secondary" to="/">Cancel</router-link>
    </form>
</div>
<div v-else>
    <p>Loading job data...</p>
</div>

</template>


<!-- Fetch the existing job data based on URL ID

Pre-fill form with current job data

Handle form submission to update the job

Send PATCH request to json-server

Redirect to JobDetail or Home after update -->


<script>
import {ref, reactive ,onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios'


export default{
    name: "EditJob",
    setup(){
        const route = useRoute();
        const router = useRouter();
        const job = ref({
            id: null,
            title: "",
            company: "",
            description: "",
            salary: null,
            location: "",
            type: "",
            experienceYears: null,
            skills: "",
            category: "",
            createdDate: ""
        })
        onMounted(async()=>{
            const jobId = route.params.id;
            try{
                const response = await fetch(`http://localhost:3000/jobs/${jobId}`);
                const jobData = await response.json();
                job.value= jobData;
            } catch(error){
                console.error("Error fetching job data:", error);
            }
    });

        const submitEdit = async () => {
            try {
                const response = await fetch(`http://localhost:3000/jobs/${job.value.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(job.value)
                });
                if (response.ok) {
                    alert('Job edited successfully!');
                    router.push('/');
                } else {
                    throw new Error('Failed to update job');
                }
            } catch (error) {
                console.error("Error updating job:", error);
                alert("Failed to update job");
            }
        };
    return {
        job,
        submitEdit
    }
}
}
</script>