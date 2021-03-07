<template>
  <div v-if="loading">
    <app-loader></app-loader>
  </div>
  <main role="main" class="container" style="margin-top: 30px" v-else>
      <app-alert :msg="alertMessage" :alertType="alertType" v-if="alert"></app-alert>
    <div class="row">
      <div class="col-md-8 blog-main">
        <div class="blog-post">
          <h2 class="blog-post-title">{{blog.blog.main_heading}}</h2>
          <p class="blog-post-meta">
            {{new Date(new Date(blog.blog.created_at).getTime()).toLocaleString("en-US",{dateStyle: "medium", timeStyle: "medium"})}} by
            <a href="#">{{blog.author.name}}</a>
          </p>
            
          
          <b-list-group-item class="d-flex justify-content-left align-items-center" style="border: none">
            <b-icon icon="hand-thumbs-up" scale="2" aria-hidden="true" :variant="liked?'primary':''" @click="createDeleteLike" style="cursor: pointer" class="like__icon"></b-icon>
            <span style="font-size: 30px; margin-left: 10px">{{" " + blog.blog.no_of_likes}}</span>
          </b-list-group-item>
          <p>{{blog.blog.main_heading_data}}</p>
          <img
            :src="blog.blog.main_image?blog.blog.main_image:'/src/assets/logo.png'"
            alt="image"
            style="max-width: 90%;display: block;margin: auto"
          />
          <div v-for="(b,i) in blog.blog.sub_headings" :key="i" style="margin-top: 20px">
            <h3>{{b}}</h3>
            <p>{{blog.blog.sub_headings_data[i]}}</p>
            <img
              v-if="blog.blog.images && blog.blog.images[i]"
              :src="blog.blog.images[i]"
              alt="image"
              class="image-fluid"
              style="max-width: 90%;display: block;margin: auto"
            />
          </div>
        </div>
        <!-- /.blog-post -->
      </div>
      <!-- /.blog-main -->

      <aside class="col-md-4 blog-sidebar">
        <div class="p-4">
          <h4 class="font-italic">Latest blogs</h4>
          <app-loader v-if="!latest" :size="3" alignLoader="left"></app-loader>
          <ol
            class="list-unstyled mb-0"
            v-for="latestBlog in latestBlogs"
            :key="latestBlog.id"
            v-else
          >
            <li>
              <router-link
                :to="{name: 'blog-view', query: {id: latestBlog.id}}"
              >{{latestBlog.main_heading}}</router-link>
            </li>
          </ol>
        </div>

        <div class="p-4">
          <app-comments :commentsArr="blog.comments.slice(0,5)" :blogId="getBlogId" :showAlert="showAlert"></app-comments>
        </div>
      </aside>
      <!-- /.blog-sidebar -->
    </div>
    <!-- /.row -->
  </main>
  <!-- /.container -->
</template>

<script>
import appLoader from "./Loader";
import appAlert from "./Alert";
import appComments from "./Comments"
export default {
    data(){
        return {
            loading: true,
            blog: {},
            HOST_URL: process.env.HOST_URL,
            latest: false,
            latestBlogs: [],
            liked: false,
            alertMessage: "",
            alertType: "",
            alert: false
            // getBlogId: this.$route.query.id
        }
    },
    components: {
        appLoader,
        appAlert,
        appComments
    },
    computed: {
        getBlogId(){
            return this.$route.query.id;
        },
        user(){
            return this.$store.getters.getUser;
        }
    },
    created: async function(){
        await this.__created();
    },
    methods: {
        async __created(){
            let res = await fetch(`${this.HOST_URL}api/v1/blogs/${this.getBlogId}`, {credentials: "include"});
            let resData = await res.json();
            console.log(resData);
            this.blog= resData.data;
            if(resData.data.liked){
                this.liked = true;
                console.log("liked");
            }
            this.loading= false;
            res = await fetch(`${this.HOST_URL}api/v1/blogs/latest_similar_blogs/${this.getBlogId}`);
            resData = await res.json();
            this.latestBlogs= resData.data;
            this.latest=true
        },
        async createDeleteLike(){
            if(!this.user.id){
                this.showAlert();
            }
            else{
                let res;
                if(!this.liked)
                    res= await fetch(`${this.HOST_URL}api/v1/likes`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({blog_id: this.getBlogId}),
                        credentials: "include"
                    });
                else
                    res= await fetch(`${this.HOST_URL}api/v1/likes/${this.getBlogId}`, {
                        method: "DELETE",
                        credentials: "include"
                    });
                let resData= await res.json();
                if(resData.status==="success"){
                    this.liked = !this.liked;
                    this.liked?this.blog.blog.no_of_likes++:this.blog.blog.no_of_likes--;
                }
            }

        },
        showAlert(){
            this.alertMessage= "Please login or signup first";
            this.alertType= "danger";
            this.alert=true;
            setTimeout(()=>{
                this.alert=false;
            },3000);
        }
    },
    watch: {
        $route(to, from){
            // this.getBlogId = to.query.id;        -- only usable if we use getBlogId a data property instead of computed property
            this.loading= true;
            this.latest = false;
            this.liked= false;
            this.__created();
        }
    }
}
</script>

<style scoped>
div.list-group-item{
    padding: 0px;
}

.like__icon:hover{
    transform: scale(1.2);
    transition: all .1s ease-in-out;
}

</style>