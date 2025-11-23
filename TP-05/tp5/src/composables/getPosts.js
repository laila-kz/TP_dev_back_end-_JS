//fetches all my posts from the json server 
const jsonServerURL ="http://localhost:3000/posts";

async function usePosts() {
    try{
        const response = await fetch(jsonServerURL)
        if(!response.ok){
            throw new Error("error fetching data");
        }
        const data = await response.json();
        return data ;
    }catch(error) {
        console.error("error fecthing data", error);
    return [];
}
}



export default usePosts;