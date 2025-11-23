import usePosts from './getPosts.js'
async function usePost(id) {
    try{
        const posts = await usePosts();
        const post = posts.find(post => post.id ==id );
        if(post){
            return post;
        }else{
            console.log("post not found");
            return null;
        }
    }catch(error){
        console.error("error fetching post", error);
        return null;
    }
    
}

export default usePost;