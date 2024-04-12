<template>
    <div class="login-container">
      <form @submit="handleSubmit" class="login-form">
        <h3>Login</h3>
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" v-model="email" placeholder="Email" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="password" placeholder="Password" />
        </div>

        <button class="btn btn-primary ">Login</button>
      </form>
    </div>
  </template>

<script>
import axios from 'axios';
export default{
    name:'Log-in',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods:
    {
        handleSubmit(e){
          e.preventDefault()
            const url = `http://localhost:3000/api/login/?email=${this.email}&password=${this.password}`
            axios.post(url)
            .then(
                res=>{
                    alert("Success!!! \nWelcome to Tantiv4")
                    console.log(res)
                    if (res.status === 201)
                    {
                        this.email='';
                        this.password='';
                        this.$router.push('/stockview');
                }}
            )
            .catch(
                err=>
                {
                    alert("Failed to Login \nInvalid details")
                    console.log(err)
                    this.email = '';
                    this.password='';
                }
            )
        },

    }

}
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
</style>