<template>
    <nav class="nav">
        <div class="container" style="display:flex;justify-content:space-between;align-items:center;">
            <h1>Blog Application</h1>
            <ul>
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/create">Create Post</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>


export default {
  name: "NavBar",

};
</script>
