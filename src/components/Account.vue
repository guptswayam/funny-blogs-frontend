<template>
  <div v-if="user.name">
    <h1>Your Account Setting</h1>
    <p
      class="alert alert-success"
      v-if="alert2"
      style="position:fixed;left:50%;transform:translateX(-50%)"
      key="success"
    >{{alert}}</p>
    <p
      class="alert alert-danger"
      v-if="alert1"
      style="position:fixed;left:50%;transform:translateX(-50%)"
      key="fail"
    >{{alert}}</p>
    <img :src="HOST_URL + 'img/users/default.jpg'" width="200" height="200" alt="image" />
    <form class="form-group" @submit.prevent="updateProfile" id="profile_form">
      <label for="name">Change Name</label>
      <input
        type="text"
        id="name"
        required
        class="form-control"
        :placeholder="user.name"
        v-model="name"
      />
      <label for="photo">Change Photo</label>
      <br />
      <input type="file" accept="image/*" name="photo" id="photo" />
      <br />
      <br />
      <button type="submit" class="btn btn-secondary">Update Profile</button>
    </form>
    <br>
    <h1>CHANGE PASSWORD</h1>
    <form class="form-group" @submit.prevent="changePassword">
      <label for="currentPassword">Current Password</label>
      <input type="password" id="currentPassword" class="form-control" placeholder="Current Password" required minlength="8" v-model="currentPassword">
      <label for="password">Password</label>
      <input type="password" id="password" class="form-control" placeholder="Password" required minlength="8" v-model="password">
      <label for="confirmPassword">Confirm Password</label>
      <input type="password" id="confirmPassword" class="form-control" placeholder="Confirm Password" required minlength="8" v-model="confirmPassword">
      <br>
      <button class="btn btn-secondary" type="submit">Update Password</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alert2: false,
      alert1: false,
      name: "",
      currentPassword: "",
      password: "",
      confirmPassword: "",
      alert: "You Successfully updated your profile...",
      HOST_URL: process.env.HOST_URL,
      loading: true,
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    
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
.btn-secondary{
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
img {
  display: block;
  margin: auto;
  border-radius: 50%;
}
</style>