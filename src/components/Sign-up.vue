<template>
    <div class="form-container">
      <form @submit="handleSubmit" class="form">
        <h3>Sign up</h3>
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" v-model="name" placeholder="Name" />
        </div>
        <div class="form-group">
          <label>Phone number</label>
          <input type="tel" class="form-control" v-model="phone" placeholder="Phone number" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" class="form-control" v-model="email" placeholder="Email" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="password" placeholder="Password" />
        </div>

        <button class="btn btn-primary btn-block">Sign up</button>
      </form>
    </div>
  </template>
<script>
import axios from 'axios';
export default{

    name: 'Sign-up',
    data(){
        return{ name: '',
                phone: '',
                email: '',
                password: ''
    }},
    methods:
    {
        handleSubmit(e){
            e.preventDefault()
            const url = `http://localhost:3000/api/signup/?name=${this.name}&phone=${this.phone}&email=${this.email}&password=${this.password}`
            axios.post(url)
            .then(
                res=>{
                    alert("Success!!!\nWelcome to Tantiv4")
                    console.log(res)
                    if (res.status===201)
                    {   this.phone='';
                        this.name = '';
                        this.email = '';
                        this.password='';
                        this.$router.push('/login');
                    }

                }
            )
            .catch(
                err=>
                {

                    alert("Failed to Register as User already exists or Invalid details")
                    console.log(err.status)
                        this.phone='';
                        this.name = '';
                        this.email = '';
                        this.password='';
                    console.log(err)

                }
            )
        },


    }

}
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
</style>