<template>
  <div>
    <app-alert v-if="alert" :alertType="alertType" :msg="alertMessage"></app-alert>
    <h1>LOGIN FORM</h1>
    <form class="form-group" @submit.prevent="login">
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        class="form-control"
        v-model="email"
        placeholder="Email"
      />
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        class="form-control"
        v-model="password"
        placeholder="Password"
      />
      <br>
      <button class="btn btn-primary" type="submit">{{value}}</button>
    </form>
  </div>
</template>

<script>
import appAlert from "./Alert";
export default {
  components: {
    appAlert
  },
  data() {
    return {
      email: "",
      password: "",
      value: "Login",
      HOST_URL: process.env.HOST_URL,
      alert: false,
      alertType: "",
      alertMessage: ""
    };
  },
  methods: {
    async login(){
      try{
        this.value="Logging...";
        let res = await fetch(`${this.HOST_URL}api/v1/users/signin`,{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({email: this.email, password: this.password}),
          credentials: "include"
        });
        let resData= await res.json();
        this.value="Login";
        if(resData.status==="success"){
          this.alertType="success";
          this.alertMessage= "Successfully Logged in"
          this.alert= true;
          this.$store.dispatch("setUser");
          setTimeout(()=>{
            this.$router.push({name: "home-page"});
          },3000)
        }
        else{
          this.alertType="danger";
          this.alertMessage= resData.message;
          this.alert= true;
          setTimeout(()=>{
            this.alert= false;
          },3000)
        }
      }catch(err){
        this.value="Login";
        this.alertType="fail";
        this.alertMessage= "something goes wrong";
        this.alert= false;
        setTimeout(()=>{
          this.alert= false;
        },3000)
      }
    }
  }
};
</script>

<style scoped>
div {
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
.btn-primary {
  transition: all 0.3s;
}
@media screen and (max-width: 768px) {
  div {
    width: 95%;
  }
  h1 {
    font-size: 24px;
  }
}
</style>