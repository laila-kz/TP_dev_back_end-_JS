<template>
<h2>home</h2>
<div>
<FilterNav :jobs="jobs" @filter="applyFilter" />
    <div v-if="loading">Loading jobs...</div>
    <div v-else>
        <div v-if="filteredLength === 0"> No jobs found.</div>
        <Job v-for="job in filteredJobs" :key="job.id" :job="job" @delete-job="Delete" />
    </div>
    </div>



</template>

<!-- functions to implement:
Fetch and display the list of jobs from json-server

Show job cards with basic info (title, company, salary)

Include a link/button to navigate to AddJob page

Handle filtering when FilterNav is used-->


<script>
import api from "../api.js";
import FilterNav from "./FilterNav.vue";
import Job from "./Job.vue";
import { ref, onMounted, computed } from 'vue';

export default {
    name: "Home",
    components: {
        FilterNav,
        Job
    },
    setup() {
        const jobs = ref([]);
        const loading = ref(false);
        const filters = ref({ q: '', category: '', type: '' });

        const fetchJobs = async () => {
            loading.value = true;
            try {
                const res = await api.get('/jobs');
                jobs.value = res.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                loading.value = false;
            }
        };

        onMounted(fetchJobs);

        function applyFilter(p) {
            filters.value = p;
        }

        const filteredJobs = computed(() => {
            return jobs.value.filter(job => {
                const q = (filters.value.q || '').toLowerCase();
                if (q) {
                    const isInTxt = ((job.title || '') + (job.company || '') + (job.location || '') + (job.description || '')).toLowerCase();
                    if (!isInTxt.includes(q)) return false;
                }
                if (filters.value.category && job.category !== filters.value.category) return false;
                if (filters.value.type && job.type !== filters.value.type) return false;
                return true;
            });
        });

        const filteredLength = computed(() => filteredJobs.value.length);

        const Delete = async (id) => {
            try {
                await api.delete(`/jobs/${id}`);
                jobs.value = jobs.value.filter(job => job.id !== id);
            } catch (error) {
                console.error("Error deleting job:", error);
            }
        };

        return { jobs, loading, applyFilter, filteredJobs, filteredLength, Delete };
    }
};
</script>