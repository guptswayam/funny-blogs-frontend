<template>
    <div class="create_blog_container">
        <app-alert v-if="alert" :msg="alertMessage" :alertType="alertType"></app-alert>
        <h1>Create Your Blog</h1>
        <form class="form-group" @submit.prevent="addBlog">
            <label for="main_heading">Main Heading</label>
            <input type="text" placeholder="Main Heading" v-model="main_heading.title" class="form-control" required>
            <label for="main_image">Main Image</label><br>
            <input type="file" accept="image/*" id="main_image" required>
            <br>
            <label for="main_heading_data">Main Content</label>
            <textarea type="text" placeholder="Main Content" v-model="main_heading.content" rows="5" class="form-control" required></textarea>
            <div v-for="i in no_of_subheadings" :key="i">
                <label>Sub Heading {{i}}</label>
                <input placeholder="Sub Heading" class="form-control" name="sub_head" required>
                <!-- <input type="file" accept="image/*" name="sub_image" required> -->
                <label>Sub Content {{i}}</label>
                <textarea placeholder="Sub Content" rows="5" class="form-control" name="sub_content" required></textarea>
            </div>
            <br>
            <div style="text-align: right">
                <button class="btn btn-primary" type="submit" id="add__button">Add</button>
            </div>
        </form>
        <button class="btn btn-secondary" @click="no_of_subheadings++">Add Subheading</button>
    </div>
</template>

<script>
import appAlert from "./Alert";
export default {
    data(){
        return {
            main_heading: {
                title: "",
                content: ""
            },
            no_of_subheadings: 0,
            alert: false,
            alertType: "",
            alertMessage: ""
        }
    },
    components: {
        appAlert
    },
    methods:{
        async addBlog(){
            console.log(this.main_heading);
            const sub_heads= document.getElementsByName("sub_head");
            const sub_contents= document.getElementsByName("sub_content");
            let sub_headings= [];
            for(let i=0;i<sub_heads.length;i++){
                sub_headings.push({sub_head: sub_heads[i].value,sub_content: sub_contents[i].value });
            }
            console.log(sub_headings);
            let main_image = document.getElementById("main_image").files[0];
            let formData= new FormData();
            formData.append("main_image", main_image);
            formData.append("main_heading", JSON.stringify(this.main_heading));
            formData.append("sub_headings", JSON.stringify(sub_headings));
            try{
                let addButton= document.getElementById("add__button");
                addButton.textContent= "Adding...";
                addButton.disabled=true;
                let res= await fetch(`${process.env.HOST_URL}api/v1/blogs`,{
                    method: "POST",
                    body: formData,
                    credentials: "include"
                })
                let resData= await res.json();
                if(resData.status==="success"){
                    this.alertMessage= "Your Blog has been created";
                    this.alertType= "success";
                    this.alert= true;
                    setTimeout(()=>{
                        this.$router.push({name: "home-page"});
                    },2000);
                }
                else{
                    addButton.textContent= "Add";
                    addButton.disabled=false;    
                    this.alertMessage= resData.message;
                    this.alertType= "danger";
                    this.alert= true;
                    setTimeout(()=>{
                        this.alert= false;
                    },3000);
                }
            }catch(err){
                addButton.textContent= "Add";
                addButton.disabled=false;    
                this.alertMessage= "No Internet Connetion";
                this.alertType= "danger";
                this.alert= true;
                setTimeout(()=>{
                    this.alert= false;
                },3000);
            }
        }
    }
}
</script>

<style scoped>
.create_blog_container {
  width: 50%;
  margin: auto;
  padding: 30px 0px;
}
label {
  margin-top: 20px;
}
h1 {
  letter-spacing: 0.7px;
  color: rgb(69, 190, 69);
  margin: 20px 0px;
  text-align: center;
  text-transform: uppercase;
}
.btn-secondary{
    transition: all 0.3s;
}
@media screen and (max-width: 768px) {
  .create_blog_container {
    width: 95%;
  }
  h1 {
    font-size: 24px;
  }
}
</style>