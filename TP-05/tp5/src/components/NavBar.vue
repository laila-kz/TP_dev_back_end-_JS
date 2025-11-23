<template>
    <nav class="navbar">
        <h1>Blog Application</h1>
        <ul>
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li>
                <router-link to="/create">Create Post</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>


export default {
  name: "NavBar",

};
</script>
