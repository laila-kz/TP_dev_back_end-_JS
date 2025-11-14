<template>
<h2>Add a New Job</h2>

<form @submit.prevent="submitJob">
    <div>
        <label for="title">Job Title:</label>
        <input type="text" id="title" name="title" v-model="formData.title" required />
    </div>
    <div>
        <label for="company">Company Name:</label>
        <input type="text" id="company" name="company" v-model="formData.company" required />
    </div>
    <div>
        <label for="description">Description:</label>
        <input type="text" id="description" name="description" v-model="formData.description" required />
    </div>
    <div>
        <label for="salary">Salary:</label>
        <input type="number" id="salary" name="salary" v-model="formData.salary" required />
    </div>
    <div>
        <label for="location">Location:</label>
        <input type="text" id="location" name="location" v-model="formData.location" required />
    </div>
    <div>
        <label for="type">Job Type:</label>
        <select id="type" name="type" v-model="formData.type" required>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="remote">Remote</option>
            <option value="on-site">On-Site</option>
            <option value="internship">Internship</option>
        </select>
    </div>
    <div>
        <label for="experienceYears">Experience (Years):</label>
        <input type="number" id="experienceYears" name="experienceYears" v-model="formData.experienceYears" required />
    </div>
    <div>
        <label for="skills">Skills (comma separated):</label>
        <input type="text" id="skills" name="skills" v-model="formData.skills" required />
    </div>
    <div>
        <label for="category">Category:</label>
        <input type="text" id="category" name="category" v-model="formData.category" required />
    </div>
    <div>
        <label for="createdDate">Creation Date:</label>
        <input type="date" id="createdDate" name="createdDate" v-model="formData.createdDate" required />
    </div>
    <div class="actions">
    <button type="submit">Add Job</button> 
    <router-link to="/">Cancel</router-link>
</div>
</form>
</template>

<script>
import axios from 'axios'
import {reactive, ref} from 'vue'
const api = axios.create({baseURL: 'http://localhost:3000'});
export default{
    name: "AddJob",
    data(){
        return{
            // form data can be managed here if needed
            formData: {
                title: '',
                company: '',
                description: '',
                salary: null,
                location: '',
                type: '',
                experienceYears: null,
                skills: '',
                category: '',
                createdDate: new Date().toISOString().split('T')[0]
            }
        }
    },
    methods: {
        async submitJob() {
            try {
                await fetch("http://localhost:3000/jobs", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.formData)
                });
                alert("Job added successfully!");
                this.$router.push('/');
                this.formData = {
                    title: '',
                    company: '',
                    description: '',
                    salary: null,
                    location: '',
                    type: '',
                    experienceYears: null,
                    skills: '',
                    category: '',
                    createdDate: new Date().toISOString().split('T')[0]
                };
            } catch (error) {
                console.error("Error adding job:", error);
                alert("Failed to add job");
            }
        }
    }
}
</script>