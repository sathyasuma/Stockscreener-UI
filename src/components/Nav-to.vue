<template>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top">
      <div class="container">
        <div class="ml-auto">
        <img src="data:image/jpeg;base64,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" alt="Xpressbees Logo" class="image ml-auto">
      </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/home" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/signup" class="nav-link">Sign up</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>

  <script>
  export default {
    name: 'NavTo'
  }
  </script>

  <style scoped>
    .image{
        width: 60px;
        height: 50pxs;
    }
  </style>
