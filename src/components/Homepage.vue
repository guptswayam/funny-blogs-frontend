<template>
  <div v-if="loading">
    <app-loader></app-loader>
  </div>
  <div v-else>
    <div style="margin-top: 20px;" v-if="!this.$route.query.liked && !this.$route.query.myBlogs">
      <form class="form-inline" style="text-align: right;display: block; padding: 10px 20px" @submit.prevent="searchBlogs">
        <input type="text" placeholder="search blog" class="form-control" style="max-width: 200px" v-model="search_str"/>
        <button class="btn btn-secondary" style="margin-left : 10px" type="submit">Search</button>
      </form>
    </div>
    <div class="row mb-2" style="padding: 20px">
      <div class="col-md-6" v-for="blog in blogs" :key="blog.id">
        <div
          class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
        >
          <div class="col p-4 d-flex flex-column position-static">
            <strong class="d-inline-block mb-2 text-primary">Funny Bloggers</strong>
            <h3 class="mb-0">{{blog.main_heading}}</h3>
            <div
              class="mb-1 text-muted"
            >{{new Date(new Date(blog.created_at).getTime()).toLocaleString("en-US",{dateStyle: "medium", timeStyle: "medium"})}}</div>
            <p class="card-text mb-auto">{{shortMainContent(blog.main_heading_data)}}</p>
            <router-link :to="'/blogs?id='+ blog.id" class="stretched-link">Continue reading</router-link>
          </div>
          <div class="col-auto d-none d-lg-block">
            <img
              :src="blog.main_image?blog.main_image:'/src/assets/logo.png'"
              alt="image"
              width="300"
              height="250"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import appLoader from "./Loader";
export default {
    data(){
        return {
            loading: true,
            blogs: [],
            HOST_URL: process.env.HOST_URL,
            search_str: ""
        }
    },  
    components: {
        appLoader
    },
    methods: {
        async __created(){
            let url;
            if(this.$route.query.liked){
                url="likes";
            }
            else if(this.$route.query.myBlogs){
                url="blogs/get_my_blogs";
            }
            else{
                url="blogs";
            }
            let res = await fetch(`${this.HOST_URL}api/v1/${url}`, {credentials: "include"});
            let resData = await res.json();
            console.log(resData);
            this.blogs= resData.data;
            this.loading= false; 
        },
        shortMainContent(main_content){
            return main_content.length>60?main_content.substr(0,60)+ "...":main_content;
        }
        ,
        async searchBlogs(){
            this.loading = true;
            let res= await fetch(`${this.HOST_URL}api/v1/blogs/search_blogs/${this.search_str}`);
            let resData = await res.json();
            console.log(resData);
            this.blogs= resData.data;
            this.loading= false; 
        }
    },
    async created(){
        await this.__created();
    },
    watch: {
        $route(to, from){
            this.loading= true;
            this.__created();
        }
    }
}
</script>

<style scoped>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>