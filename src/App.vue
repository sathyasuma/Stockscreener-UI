<template>
  <div id="app">
      <Nav />

      <div class="auth-wrapper">
        <div class="auth-inner">
          <router-view />
        </div>
      </div>
  </div>
  </template>


  <script>
  /* eslint-disable */
  import Nav from './components/Nav-to.vue'
  import Login from './components/Log-in.vue'
  import Order from './components/Stock-page.vue'
  import Home from './components/Home-nav.vue'
  import Signup from './components/Sign-up.vue'
  import router from './router'
  import Sidebar from './components/Stock-view.vue'
  export default {
    name: 'App',
    components:{
    Nav
}
  }
  </script>

  <style>
@import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800');
*{
  box-sizing: border-box;
}
body{
background: skyblue;
min-height: 100vh;
align-items: center;
display:flex;
font-weight: 300;
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
h1,h2,h3,h4,h5,h6,label,span{
  text-emphasis-color: black;
  font-weight: 500;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
body,html,#app,#root,auth-wrapper{
  width: 100%;
  height: 100%;
}
#app{
  text-align: center;
}
.navbar-light{
  background-color: #ffffff;
  box-shadow: 0px 15px 80px rgba(35,34,60,0.2);
}
.auth-wrapper{
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}
.auth.inner
{
  width: 500px;
  margin: auto;
  background: #ffffff;
  box-shadow:  0px 15px 65px rgba(35,34,60,0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all .3s;
}
.auth-wrapper .form-control:focus{
  border: color #167bff;
  box-shadow: none;
}
.auth-wrapper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}
.custom-control-label{
  font-weight: 400;
}
.forgot-password,forgot-password a{
text-align: right;
font-size: 13px;
padding-top: 10px;
color:#7f7d7d;
margin: 0;
}
.forgot-password a{
  color: #167bff;
}
  </style>