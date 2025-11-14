const TaskList ={
    template: `
    <div>
        <h2>task list</h2>
        <div class="stats-container">
        <p> Total number of tasks : {{totalTasks}}</p>
        <p> Number of completed tasks : {{completedTasks}}</p>
        <p> Number of pending tasks : {{totalTasks - completedTasks}}</p>
        </div>
        <div class="filter-buttons">
        <button @click="showAllTasks() " class="filter-btn" :class="{ 'active': filter === 'all' }">
            Show All Tasks
        </button>
        <button @click="showCompletedTasks()" class="filter-btn" :class="{ 'active': filter === 'completed' }">
            Show Completed Tasks
        </button>
        <button @click="showPendingTasks()" class="filter-btn" :class="{ 'active': filter === 'pending' }">
            Show Pending Tasks
        </button>
        </div>
        <ul class="tasks-list">
            <li v-for="task in filteredTasks" :key="task.id" class="task-item">
                <h3 class="task-title">{{ task.title }}</h3>
                <p class="task-description">{{ task.description }}</p>
                <button v-show="!task.completed" @click="markAsCompleted(task.id)" class="complete-btn">Mark as completed</button>

            </li>
        </ul>
        <div v-if="filteredTasks.length === 0" class="empty-state">
            No tasks to display with the current filter.
        </div>

    </div>


    `,
    data(){
        return {
            filter: 'all',
            tasks:[
        {
        "id": 1,
        "title": "Faire les courses",
        "description": "Acheter des légumes et du lait.",
        "completed": false
        },
        {
        "id": 2,
        "title": "Faire du sport",
        "description": "Courir pendant 30 minutes.",
        "completed": true
        },
        {
        "id": 3,
        "title": "Réviser pour l'examen",
        "description": "Relire le chapitre 5 du manuel.",
        "completed": false
        }
    ]
}
    }, 
    computed:{
        totalTasks(){
            return this.tasks.length;
        },
        completedTasks(){
            return this.tasks.filter(task=> task.completed).length;
        },
    filteredTasks(){
    if (this.filter === 'completed') {
            return this.tasks.filter(t => t.completed);
        } else if (this.filter === 'pending') {
            return this.tasks.filter(t => !t.completed);
        } else {
            return this.tasks;
        }
    }
    },
    methods:{
        markAsCompleted(taskId){
            const task = this.tasks.find(t=> t.id === taskId);
            if(task){
                task.completed = true;
            }
        },
        showAllTasks(){
            this.filter = 'all';
        },
        showCompletedTasks(){
            this.filter = 'completed';
        },
        showPendingTasks(){
            this.filter = 'pending';
        }
    }
};


export default TaskList;