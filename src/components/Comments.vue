<template>
    <div>
        <h4 class="font-italic">Comments</h4>
        <form style="display: flex" class="form-group" @submit.prevent="addNewComment">
            <input type="text" class="form-control" placeholder="Add Comment" required v-model="newCommentText">
            <button class="btn btn-secondary" style="margin-left:10px" type="submit" id="add_comment">Post</button>
        </form>
        <h5 class="font-italic">Recent</h5>
          <ol class="list-unstyled">
            <li v-for="comment in commentsArr" :key="comment.created_at" style="background-color: #f4f4f4;padding: 10px;border-radius: 3px;box-shadow: 1px 1px 3px black;margin-top: 10px">
              <span style="color: purple;text-align: left">{{comment.comment_text}}</span>
              <div style="font-size: 12px;font-style: italic; text-align:  center">
                <span>{{comment.name}}</span> ||
                <span>{{new Date(new Date(comment.created_at).getTime() + 5.5*60*60*1000).toLocaleString("en-US", {dateStyle: "medium", timeStyle: "medium"})}}</span>
              </div>
            </li>
          </ol>
          <div>
              <button class="btn btn-secondary" v-if="previousVisible" style="float: left" @click="nextPrevComments($event, page-1)" key="previous">Prev</button>
              <button class="btn btn-secondary" style="float: right" v-if="nextVisible" @click="nextPrevComments($event, page+1)" key="next">Next</button>
          </div>
    </div>
</template>

<script>
export default {
    props: {
        commentsArr: {
            type: Array,
            default: [],
            newCommentText: ""
        },
        blogId: {
            type: String
        },
        showAlert: {
            type: Function
        }
    },
    data(){
        return {
            page: 1,
            limit: 5,
            nextVisible: this.commentsArr.length>=5,
            busy: false,
            newCommentText: ""
        }
    },
    computed: {
        previousVisible(){
            return this.page>1;
        },
        user(){
            return this.$store.getters.getUser;
        }
    },
    methods: {
        // nextPrevComments() can be executed at the same time
        async nextPrevComments(e,p){
            if(this.busy){
                setTimeout(()=>{
                    e.target.click();
                },1000);
                console.log("busy");
                return;
            }
            this.busy=true;
            e.target.disabled=true;
            e.target.textContent= e.target.textContent+ "...";
            let res= await fetch(`${process.env.HOST_URL}api/v1/comments/${this.$route.query.id}?page=${p}&limit=${this.limit}`);
            let resData = await res.json();
            if(resData.data.length===0){
                this.nextVisible= false
            }
            else{
                this.commentsArr= resData.data;
                this.nextVisible= this.commentsArr.length>=5;
                this.page=p;
            }
            e.target.textContent= e.target.textContent.substr(0, e.target.textContent.length-3)
            this.busy= false;
            e.target.disabled=false;
            console.log(resData);
        }, 
        async addNewComment(){
            if(!this.user.id){
                this.showAlert();
            }
            else{
                const EL= document.getElementById("add_comment");
                EL.textContent="Posting...";
                EL.disabled=true;
                let res = await fetch(`${process.env.HOST_URL}api/v1/comments`,{
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        blog_id: this.blogId,
                        comment_text: this.newCommentText
                    }),
                    credentials: "include"
                });
                let resData= await res.json();
                if(resData.status==="success"){
                    EL.textContent="Post";
                    EL.disabled=false;
                    this.newCommentText= "";
                    res= await fetch(`${process.env.HOST_URL}api/v1/comments/${this.$route.query.id}?page=1&limit=5`);
                    resData= await res.json();
                    this.commentsArr= resData.data;
                    this.page=1;
                    this.limit=5;
                    this.nextVisible= this.commentsArr.length>=5;
                }

            }
        }
    }
}
</script>

<style scoped>
</style>