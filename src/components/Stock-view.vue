<template>
    <div class="long-sidebar">
      <div class="sidebar-header">
      </div>
      <ul class="menu">
        <li> <router-link to="/stocks">Stock Screener</router-link> </li>
        <li> <router-link to="/watchlist">My Watch List</router-link> </li>
        <li><router-link to="/home">About</router-link></li>
        <li><router-link to="/home">Services</router-link></li>
        <li><router-link to="/home">Contact</router-link></li>
        <!-- Add more menu items as needed -->
      </ul>
    </div>
  </template>
<script>
export default{
name: 'Stock-view'
}
</script>
<style scoped>
  .long-sidebar {
    width: 150px;
    background-color: #333;
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    overflow-y: auto; /* Enable scrolling if the content is longer */
  }

  .sidebar-header {
    padding: 70px;
    font-size: 20px;

    background-color: #222;
  }

  .menu {
    list-style: none;
    padding: 0;
    margin: 20px 0;
  }

  .menu li {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .menu li:hover {
    background-color: #555;
  }
  </style>
