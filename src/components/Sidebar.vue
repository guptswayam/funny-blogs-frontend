<template>
  <div class="container-fluid">
    <div style="display: flex;justify-content: space-between;">
      <h4>Funny Bloggers</h4>
      <b-icon
        icon="list-ul"
        v-b-toggle.sidebar-backdrop
        scale="2"
        style="cursor: pointer;outline:none;margin-top:8px"
      ></b-icon>
    </div>
    <b-sidebar id="sidebar-backdrop" title="Funny Bloggers" backdrop shadow style="margin: auto">
      <div style="margin-top: 10px;text-align: left">
        <b-list-group v-if="!user.email">
          <b-list-group-item><router-link :to="{name: 'home-page'}">Blogs</router-link></b-list-group-item>
          <b-list-group-item><router-link :to="{name: 'signin'}" active-class="link_active">Login</router-link></b-list-group-item>
          <b-list-group-item><router-link :to="{name: 'signup'}" active-class="link_active">Sign up</router-link></b-list-group-item>
        </b-list-group>
        <b-list-group v-else>
          <b-list-group-item><router-link :to="{name: 'home-page'}">Blogs</router-link></b-list-group-item>
          <b-list-group-item><router-link :to="{name: 'home-page', query: {liked: 'true'}}">Liked Blogs</router-link></b-list-group-item>
          <b-list-group-item><router-link :to="{name: 'account'}" active-class="link_active">My Profile</router-link></b-list-group-item>
          <b-list-group-item><router-link :to="{name: 'add-blog'}">Create Blog</router-link></b-list-group-item>
          <b-list-group-item><router-link :to="{name: 'home-page', query: {myBlogs: 'true'}}">My Blogs</router-link></b-list-group-item>
          <b-list-group-item><a href="#" @click="logout">Logout</a></b-list-group-item>
        </b-list-group>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    computed: {
        user(){
            return this.$store.getters.getUser;
        }
    },
    methods: {
        async logout(){
            try{
                let res= await fetch(`${process.env.HOST_URL}api/v1/users/logout`, {credentials: "include"});
                location.assign("/");
            }
            catch(err){
                console.log(err);
            }
        }
    }
  }
</script>

<style scoped>
.container-fluid {
  background-color: lightgray;
  padding: 20px 30px;
}
h4{
    font-family: 'Courier New', Courier, monospace;
}
.link_active{
    text-decoration: underline;
}
</style>